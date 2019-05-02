/**
 * Рассчитывает координаты правого края для изображения слева и левых краев для изображений справа в шапке
 */

let leftSide = document.getElementsByClassName('header_side_left')[0],
    leftSideImage = leftSide.getElementsByClassName('teaser__image-wrap')[0],

    rightSide = document.getElementsByClassName('header_side_right')[0],
    rightSideImages = rightSide.getElementsByClassName('teaser__image-wrap'),

    rightSideItem = rightSide.getElementsByClassName('header__item')[0],

    setPositions = () => {

        // расчет координат для изображения слева
        let right = window.innerWidth > 960
                    ? window.innerWidth - rightSide.offsetLeft + 3 - 10
                    : 0;

        leftSideImage.style.right = right + 'px';


        // расчет координат для изображений справа
        let left = window.innerWidth > 960
                   ? rightSide.offsetLeft + 10
                   : 0;

        for (let i = 0; i < rightSideImages.length; i++)
            rightSideImages[i].style.left = left + 'px';

    };

export { setPositions };