const form = document.querySelector('#form');
const input = document.querySelector('#title');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	if (input.value.trim() === '') return alert('할일을 입력하세요.');

	const newTask = {
		id: performance.now(),
		title: input.value,
		createAt: new Date(),
	};

	console.log(newTask);
});
