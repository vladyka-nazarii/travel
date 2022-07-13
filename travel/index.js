// BURGER MENU
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const burger = document.querySelector('.burger');
const burgerClose = document.querySelector('.burger-close');
const navList = document.querySelector('.nav-list');
const active = function() {
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('lock');
};
burger.addEventListener("click", active);
burgerClose.addEventListener("click", active);
navList.addEventListener("click", active);
overlay.addEventListener("click", active);
// SLIDER
const carousel = document.querySelector('.carousel');
const spain = document.querySelector('.spain');
const spain2 = document.querySelector('.spain2');
const japan = document.querySelector('.japan');
const japan2 = document.querySelector('.japan2');
const usa = document.querySelector('.usa');
const usa2 = document.querySelector('.usa2');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const leftClick = document.querySelector('.left-click');
const rightClick = document.querySelector('.right-click');
const filled = document.querySelector('.filled');
let orderDesktop = 0;
let orderMobile = -1;
leftClick.addEventListener("click", function() {
  if (orderDesktop === 0) {
    orderDesktop = -1;
    filled.style = "order: -1";
    carousel.classList.toggle('left');
    setTimeout(function() {
      carousel.style = "transition: all 0s ease 0s";
      carousel.classList.toggle('left');
      spain2.style = "order: 1";
      japan2.style = "order: 2";
      usa2.style = "order: 3";
      spain.style = "order: 4";
      japan.style = "order: 5";
      usa.style = "order: 6";
    }, 1000);
    carousel.style = "transition: all 1s ease 0s";
  } else if (orderDesktop === -1) {
    orderDesktop = 1;
    filled.style = "order: 1";
    carousel.classList.toggle('left');
    setTimeout(function() {
      carousel.style = "transition: all 0s ease 0s";
      carousel.classList.toggle('left');
      spain2.style = "order: 2";
      japan2.style = "order: 3";
      usa2.style = "order: 4";
      spain.style = "order: 5";
      japan.style = "order: 6";
      usa.style = "order: 1";
    }, 1000);
    carousel.style = "transition: all 1s ease 0s";
  } else if (orderDesktop === 1) {
    orderDesktop = 0;
    filled.style = "order: 0";
    carousel.classList.toggle('left');
    setTimeout(function() {
      carousel.style = "transition: all 0s ease 0s";
      carousel.classList.toggle('left');
      spain2.style = "order: 3";
      japan2.style = "order: 4";
      usa2.style = "order: 5";
      spain.style = "order: 6";
      japan.style = "order: 1";
      usa.style = "order: 2";
    }, 1000);
    carousel.style = "transition: all 1s ease 0s";
}})
rightClick.addEventListener("click", function() {
  if (orderDesktop === 0) {
    orderDesktop = 1;
    filled.style = "order: 1";
    carousel.classList.toggle('right');
    setTimeout(function() {
      carousel.style = "transition: all 0s ease 0s";
      carousel.classList.toggle('right');
      spain2.style = "order: 5";
      japan2.style = "order: 6";
      usa2.style = "order: 1";
      spain.style = "order: 2";
      japan.style = "order: 3";
      usa.style = "order: 4";
    }, 1000);
    carousel.style = "transition: all 1s ease 0s";
  } else if (orderDesktop === 1) {
    orderDesktop = -1;
    filled.style = "order: -1";
    carousel.classList.toggle('right');
    setTimeout(function() {
      carousel.style = "transition: all 0s ease 0s";
      carousel.classList.toggle('right');
      spain2.style = "order: 4";
      japan2.style = "order: 5";
      usa2.style = "order: 6";
      spain.style = "order: 1";
      japan.style = "order: 2";
      usa.style = "order: 3";
    }, 1000);
    carousel.style = "transition: all 1s ease 0s";
  } else if (orderDesktop === -1) {
    orderDesktop = 0;
    filled.style = "order: 0";
    carousel.classList.toggle('right');
    setTimeout(function() {
      carousel.style = "transition: all 0s ease 0s";
      carousel.classList.toggle('right');
      spain2.style = "order: 3";
      japan2.style = "order: 4";
      usa2.style = "order: 5";
      spain.style = "order: 6";
      japan.style = "order: 1";
      usa.style = "order: 2";
    }, 1000);
    carousel.style = "transition: all 1s ease 0s";
}})
leftArrow.addEventListener("click", function() {
  if (orderMobile === 0) {
    orderMobile = -1;
    filled.style = "order: -1";
    carousel.classList.toggle('left');
    setTimeout(function() {
      carousel.style = "transition: all 0s ease 0s";
      carousel.classList.toggle('left');
      spain.style = "order: 2";
      japan.style = "order: 3";
      usa.style = "order: 1";
    }, 1000);
    carousel.style = "transition: all 1s ease 0s";
  } else if (orderMobile === -1) {
    orderMobile = 1;
    filled.style = "order: 1";
    carousel.classList.toggle('left');
    setTimeout(function() {
      carousel.style = "transition: all 0s ease 0s";
      carousel.classList.toggle('left');
      spain.style = "order: 3";
      japan.style = "order: 1";
      usa.style = "order: 2";
    }, 1000);
    carousel.style = "transition: all 1s ease 0s";
  } else if (orderMobile === 1) {
    orderMobile = 0;
    filled.style = "order: 0";
    carousel.classList.toggle('left');
    setTimeout(function() {
      carousel.style = "transition: all 0s ease 0s";
      carousel.classList.toggle('left');
      spain.style = "order: 1";
      japan.style = "order: 2";
      usa.style = "order: 3";
    }, 1000);
    carousel.style = "transition: all 1s ease 0s";
}})
rightArrow.addEventListener("click", function() {
  if (orderMobile === 0) {
    orderMobile = 1;
    filled.style = "order: 1";
    carousel.classList.toggle('right');
    setTimeout(function() {
      carousel.style = "transition: all 0s ease 0s";
      carousel.classList.toggle('right');
      spain.style = "order: 3";
      japan.style = "order: 1";
      usa.style = "order: 2";
    }, 1000);
    carousel.style = "transition: all 1s ease 0s";
  } else if (orderMobile === 1) {
    orderMobile = -1;
    filled.style = "order: -1";
    carousel.classList.toggle('right');
    setTimeout(function() {
      carousel.style = "transition: all 0s ease 0s";
      carousel.classList.toggle('right');
      spain.style = "order: 2";
      japan.style = "order: 3";
      usa.style = "order: 1";
    }, 1000);
    carousel.style = "transition: all 1s ease 0s";
  } else if (orderMobile === -1) {
    orderMobile = 0;
    filled.style = "order: 0";
    carousel.classList.toggle('right');
    setTimeout(function() {
      carousel.style = "transition: all 0s ease 0s";
      carousel.classList.toggle('right');
      spain.style = "order: 1";
      japan.style = "order: 2";
      usa.style = "order: 3";
    }, 1000);
    carousel.style = "transition: all 1s ease 0s";
}})
// CONSOLE
console.log('1. Вёрстка соответствует макету. Ширина экрана 390px +48\n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки.\nВесь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n3. На ширине экрана 390рх и меньше реализовано адаптивное меню +22\n\nИтого 75 баллов')