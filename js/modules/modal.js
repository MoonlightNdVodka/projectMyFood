function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('hide');
	modal.classList.remove('show');
	// modal.classList.toggle('hide');
	document.body.style.overflow = '';
	clearInterval(modalTimerId);
}

function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('show');
	modal.classList.remove('hide');
	// modal.classList.toggle('show');
	document.body.style.overflow = 'hidden';

	console.log(modalTimerId);
	if (modalTimerId) {
		//если параметр передан, выключаем таймер что бы окно не вызвалось, если мы сами нажали на кнопку 
		clearInterval(modalTimerId);
	}
}



function modal(triggerSelector, modalSelector, modalTimerId) {
	// Modal
	// Показывает модальное окон при нажатии на кнопку и 
	// Скрывает окно при нажатии на крестик  
	const modalTrigger = document.querySelectorAll(triggerSelector);
	const modal = document.querySelector(modalSelector);
	// const modalCloseBtn = document.querySelector('[data-close]');

	modalTrigger.forEach(btn => {
		//callBack-функции при обьявлении не должны обьявляться со скобками, 
		// что бы они не вызывались сразу при компиляции кода, 
		// в случае если нам необходимо поместить в скобки функции аргумент, 
		// можно обернуть одну функцию в другую коллбэк функцию подобным образом:
		// () => openModal(modalSelector)
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
		window.removeEventListener('scroll', showModalByScroll);
	});

	// modalCloseBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => {
		//если пользователь кликает вне модального окна(площадь везде, кроме окна) = закрываем окно
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
			window.removeEventListener('scroll', showModalByScroll);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === "Escape" && modal.classList.contains('show')) {
			closeModal(modalSelector);
			window.removeEventListener('scroll', showModalByScroll);
		}
	});

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 100) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};