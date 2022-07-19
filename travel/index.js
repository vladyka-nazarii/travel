// POP-UP
const register = () => {                                                                          //change .pop-up to register
  document.querySelector('.pop-up__title-text').innerHTML = 'Create account';                     //change title text
  document.querySelector('.facebook').classList.add('register');                                  //remove facebook button
  document.querySelector('.google').classList.add('register');                                    //remove google button
  document.querySelector('.or').classList.add('register');                                        //remove or div
  document.querySelector('.forgot').classList.add('register');                                    //remove forgot text
  document.querySelector('.sign').innerHTML = 'Sign Up';                                          //change sign button text
  document.querySelector('.bottom-text').innerHTML = 'Already have an account? <span class="last-text-login">Log in</span>';    //change bottom text
};
const login = () => {                                                                             //change .pop-up to login
  document.querySelector('.pop-up__title-text').innerHTML = 'Log in to your account';             //change title text
  document.querySelector('.facebook').classList.remove('register');                               //add facebook button
  document.querySelector('.google').classList.remove('register');                                 //add google button
  document.querySelector('.or').classList.remove('register');                                     //add or div
  document.querySelector('.forgot').classList.remove('register');                                 //add forgot text
  document.querySelector('.sign').innerHTML = 'Sign In';                                          //change sign button text
  document.querySelector('.bottom-text').innerHTML = 'Don’t have an account? <span class="last-text-register">Register</span>';    //change bottom text
};
document.querySelector('.button-login').addEventListener("click", () => {                         //listen click on .button-login
  document.querySelector('.pop-up').classList.add('slideout');                                    //open .pop-up
  document.querySelector('.overlay').classList.add('active');                                     //make .overlay visible
  document.body.classList.add('lock');                                                            //lock scroll
});
document.querySelector('.pop-up').addEventListener("click", (event) => {                          //listen click on .pop-up
  if (event.target.className === 'last-text-register') {register()                                //change .pop-up to login by click on .last-text-register
} else if (event.target.className === 'last-text-login') {login()}});                             //change .pop-up to register by click on .last-text-login
// BURGER MENU
const openMenu = () => {
  document.querySelector('.menu').classList.add('active');                                        //open .menu
  document.querySelector('.overlay').classList.add('active');                                     //make .overlay visible
  document.body.classList.add('lock');};                                                          //lock scroll
const closeMenu = () => {
  document.querySelector('.menu').classList.remove('active');                                     //close .menu
  document.querySelector('.overlay').classList.remove('active');                                  //make .overlay unvisible
  document.body.classList.remove('lock');                                                         //unlock scroll
  document.querySelector('.pop-up').classList.remove('slideout');                                 //close .pop-up
  document.querySelector('.pop-up').ontransitionend = () => {login()}};                           //change .pop-up to login
document.querySelector('.burger').addEventListener("click", ()=>{openMenu()});                    //open .menu by click on .burger
document.querySelector('.burger-close').addEventListener("click", ()=>{closeMenu()});             //close .menu by click on .burger-close
document.querySelector('.nav-list').addEventListener("click", (event)=>{
  if (event.target.className !== 'nav-link nav-login hide') {closeMenu()}                         //close .menu by click on .nav-list
  else {document.querySelector('.menu').classList.remove('active');                               //close .menu by click on .nav-list
        document.querySelector('.pop-up').classList.add('slideout');}});                          //open .pop-up by click on .nav-login
document.querySelector('.overlay').addEventListener("click", ()=>{closeMenu()});                  //close .menu by click on .overlay
// SLIDER
let order = 0;                                                                                    //create var order
const setOrder = () => document.querySelector(':root').style.setProperty('--order', order);       //set css var(--order) = order
const leftDots = () => {(order === -1) ? (order = 1, setOrder()) : (order -= 1, setOrder())};     //set scroller order by .left-click
const rightDots = () => {(order === 1) ? (order = -1, setOrder()) : (order += 1, setOrder())};    //set scroller order by .right-click
const pictures = [];                                                                              //create arr pictures
document.querySelectorAll('.picture').forEach((_, index, array) => {pictures[index] = array[index].innerHTML});   //fill arr pictures
pictures.push(pictures[Math.floor(pictures.length/2)]);                                           //add middle element to the end
const changeOrder = () => document.querySelectorAll('.picture').forEach((_, index, array) => {array[index].innerHTML = pictures[index]});   //change order of pictures in html
const left = () =>  {pictures.unshift(pictures.pop()); changeOrder(); leftDots();}                //change order in arr pictures by .left-click
const right = () => {pictures.push(pictures.shift()); changeOrder(); rightDots();}                //change order in arr pictures by .right-click
const offset = document.querySelectorAll('.picture')[1].offsetLeft - document.querySelectorAll('.picture')[0].offsetLeft.toString()+"px";   //calc offset
document.querySelector(':root').style.setProperty('--offset', offset);                            //set css var(--offset) = offset
const carousel = document.querySelector('.carousel');                                             //create var carousel
if (document.body.clientWidth <= 390) {left();}                                                   //move left when .body width <= 390px
document.querySelector('.left-click').addEventListener("click", () => {
  carousel.classList.add('left'); carousel.ontransitionend = () => {carousel.classList.remove('left'); left()}});       //move left by .left-click
document.querySelector('.right-click').addEventListener("click", () => {
  carousel.classList.add('right'); carousel.ontransitionend = () => {carousel.classList.remove('right'); right()}});    //move right by .right-click
document.querySelector('.left-arrow').addEventListener("click", () => {
  carousel.classList.add('left'); carousel.ontransitionend = () => {carousel.classList.remove('left'); left()}});       //move left by .left-arrow
document.querySelector('.right-arrow').addEventListener("click", () => {
  carousel.classList.add('right'); carousel.ontransitionend = () => {carousel.classList.remove('right'); right()}});    //move right by .right-arrow
// CONSOLE
// console.log('1. Вёрстка соответствует макету. Ширина экрана 390px +48\n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки.\nВесь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n3. На ширине экрана 390рх и меньше реализовано адаптивное меню +22\n\nИтого 75 баллов')