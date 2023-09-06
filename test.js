const form = document.querySelector('#form');
const input = document.querySelector('#title');
const list = document.querySelector('#list');

//처음 페이지 로딩시 로컬 저장소에서 TASKS에 대한 데이터호출
//해당 데이터가 있으면 parsing 해서 tasks배열에 저장, 없으면 빈배열 저장
let tasks = JSON.parse(localStorage.getItem('TASKS')) || [];
//tasks에 배열값을 반복출력 (만약 저장소에 값이없으면 출력안됨)
tasks.map((task) => addListItem(task));

//Submit이벤트가 발생할때마다
form.addEventListener('submit', (e) => {
	e.preventDefault();

	//input요소에 값이 없으면 경고창 출력
	if (input.value.trim() === '') return alert('할일을 입력하세요.');

	//값이 있으면 객체에 id, title, 현재시간을 객체로 저장
	const newTask = {
		id: performance.now(),
		title: input.value,
		createdAt: new Date(),
	};
	//input요소 값을 비우고
	input.value = '';

	//기존 배열에 할일 객체목록 추가, 새로운 목록이 위로 올라오도록 전개연산자 사용
	tasks = [newTask, ...tasks];
	//순간적으로 ul안쪽의 기존 목록을 모두 지우고(안그럼 기존 목록까지 같이 출력됨)
	list.innerHTML = '';
	//새로운 객체가 만들어지면 저장소에 데이터를 집어넣고
	localStorage.setItem('TASKS', JSON.stringify(tasks));
	//tasks에 있는 배열값을 반복돌면서 목록 생성
	tasks.map((task) => addListItem(task));
});

//객체를 파라미터로 받아서 li목록을 동적으로 생성해주는 함수
function addListItem(task) {
	//li, input 엘리먼트 노드 생성
	const item = document.createElement('li');
	const checkbox = document.createElement('input');
	//input노드에 checkbox타입 설정
	checkbox.type = 'checkbox';
	//동적인 목록이 추가된 상태에서 change이벤트가 발생하지 않고 바로 새로고침되었을때 checked유무에 따라 속성, 스타일 변경
	checkbox.checked = task.complete ? true : false;
	item.style.textDecoration = task.complete ? 'line-through' : 'none';

	//동적으로 생성되는 checkbox요소에 아예 이벤트핸들러까지 연결해서 생성
	//이벤트위임을 하지 않아도 동적인 요소에 이벤트 연결하는 방법
	checkbox.addEventListener('change', () => {
		task.complete = checkbox.checked;
		//change이벤트가 발생할때마다 해당객체의 complete값이 true면 line-through적용 그렇지 않으면 미적용
		item.style.textDecoration = task.complete ? 'line-through' : 'none';
		//동적으로 생긴 checkbox요소에 change이벤트가 발생할때마다 다시 변경점을 로컬저장소에 저장
		localStorage.setItem('TASKS', JSON.stringify(tasks));
	});
	//li노드에 자식으로 checkbox, 인수로 받은 객체의 할일내용 추가
	item.append(checkbox, task.title);
	//완성된 li노드를 ul안에 추가
	list.append(item);
}
