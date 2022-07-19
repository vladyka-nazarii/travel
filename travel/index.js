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
document.querySelector('.sign').addEventListener("click", () => {
  closeMenu();
  alert('E-mail: '+ document.getElementById('email').value +'\n\nPassword: ' + document.getElementById('password').value);
});
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
document.querySelector('.overlay').addEventListener("click", ()=>{closeMenu()});                  //close .pop-up & .menu by click on .overlay
document.addEventListener('keydown', (event)=>{if (event.key === 'Escape') {closeMenu()}});       //close .pop-up & .menu by Escape key
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
console.log('1. Слайдер изображений в секции "destinations" +50\n   - на десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели\n     (например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину\n     оказывается справа). Слайдер может быть как конечным так и бесконечным - данный критерий не должен влиять на\n     оценку + 20\n   - Три точки внизу отображают "номер слайда", то есть каждому слайду соответствует свой кружочек, который\n     становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна,\n     но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер\n     достиг края) +20\n   - Анимации плавного перемещения для слайдера +10\n2. Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50\n   - логин попап соответствует верстке его закрытие происходит при клике вне попапа +25\n   - логин попап имеет 2 инпута (логин и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с\n     введенными данными (для реализации можно использовать тег <form>) +25\n3. Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету\n   (То есть нажатие не закрывает модал а просто меняет его наполнение). +25\n\nИтого 125 баллов')