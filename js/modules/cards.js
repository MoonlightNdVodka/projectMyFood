import {
    getResource
} from '../services/services';

function cards() {
    //используем CLASS-ы для карточек  

    class FoodMenu {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            //получает родительский элемент со страницы, куда записывается класс
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
            this.parent.append(element);
        }
    }
    // НИЖЕ создаем ссылку на запрос, по которому забираем из базы данных поля для конструктора меню
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new FoodMenu(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // //ПОДКЛЮЧАЕМ внешнюю библиотеку axios
    // axios.get('http://localhost:3000/menu')
    // 	.then(dataRequest => {
    // 		dataRequest.data.forEach(({
    // 			img,
    // 			altimg,
    // 			title,
    // 			descr,
    // 			price
    // 		}) => {
    // 			new FoodMenu(img, altimg, title, descr, price, '.menu .container').render();
    // 		});
    // 	});
}

export default cards;