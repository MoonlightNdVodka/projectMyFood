window.addEventListener('DOMContentLoaded', () => {

    //Tabs 

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        //удаляет Жирную обводку и активный класс с меню табов
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }  

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        //добавляет Жирную обводку и активный класс к меню табов
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    //этот модуль перебирает табы на которые пользователь кликает на странице
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i); 
                    // showMenu();
                    // hideMenu(i);
                }
            });
        }
    
    });

    //Timer

    const deadline = '2021-12-31';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
        //находит целое кол-во дней для таймера, остаток неполного дня отбрасывает
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              //находит кол-во часов для таймера, остаток в виде целых дней и секунд отбрасывает
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              //остаток только минут
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock ('.timer', deadline)

    // Modal
    // Показывает модальное окон при нажатии на кнопку и 
    // Скрывает окно при нажатии на крестик  
    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-close]');

    function openModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        //выключаем таймер что бы окно не вызвалось, если мы сами нажали на кнопку 
        clearInterval(modalTimerId);
    }

    function closeModal () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('hide');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        //если пользователь кликает вне модального окна(площадь везде, кроме окна) = закрываем окно
       if (e.target === modal) {
        closeModal();
       }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 5000);

//     function showModalByScroll() {
//         if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
//             openModal();
//             window.removeEventListener('scroll', showModalByScroll);
//         }
//     }

//     window.addEventListener('scroll', showModalByScroll);
// });

    //создание MENU для каждой группы 
    // const menuItem = document.querySelectorAll('.menu__item');
    // console.log(menuItem);

    // function showMenu() {
    //     menuItem.forEach (item => {
    //     item.classList.add('menu__item');
    //     item.classList.remove('hide');
    //     });
    // };

    // function hideMenu(i) {

    //     menuItem.forEach ((item, id) => {
    //     if (i !== id ){
    //         item.classList.add('hide');
    //         item.classList.remove('menu__item');
    //     } 
    
    //     if (i == 3) { showMenu();}
    //     });
    // };


    //используем CLASS-ы для карточек  
    class Menu {
        constructor(src, alt, title, descr, price, parentSelector, ...classes ) {
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
            };
   
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
    
    //создавая такой обьект мы его не сохраняем никуда, он после обьявления удалится 
    new Menu(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню “Фитнес”",
        "Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9,
        ".menu .container"
    ).render();

    new Menu(
        "img/tabs/elite.jpg",
        "elite",
        "Меню “Премиум”",
        "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        14,
        ".menu .container",
        "menu__item"
    ).render();

    new Menu(
        "img/tabs/post.jpg",
        "post",
        "Меню “Постное”",
        "Меню “Постное” - - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        21,
        ".menu .container",
        "menu__item"
    ).render();
});




