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

console.log('1. Вёрстка соответствует макету. Ширина экрана 390px +48\n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки.\nВесь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n3. На ширине экрана 390рх и меньше реализовано адаптивное меню +22\n\nИтого 75 баллов')