/**
 * Переключение слайдов по нажатию кнопок
 */
let slider = document.getElementsByClassName('slider')[0],
    slides = slider.getElementsByClassName('slider__item'),
    buttons = slider.getElementsByClassName('toolbar__button');

let activate_slide = function () {

    for (let i = 0; i < slides.length; i++) {
        // деактивируем слайды
        slides[i].classList.remove('slider__item_active');

        // снимаем выделение с кнопок
        buttons[i].classList.remove('toolbar__button_active');
    }

    // активируем слайд, связанный с нажатой кнопкой
    let target = this.attributes.getNamedItem('data-item').value - 1;
    slides[target].classList.add('slider__item_active');

    // выделяем кнопку, на которую нажали
    this.classList.add('toolbar__button_active');

};

let init = () => {
    for (let i = 0; i < buttons.length; i++)
        buttons[i].addEventListener('click', activate_slide);
};

export { init };