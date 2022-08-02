// 1. TIME & DATE
const time = document.querySelector('.time');                                  //find time
function showTime() {                                                          //func to update time, date, greeting every 1 sec
  time.textContent = new Date().toLocaleTimeString();
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}
const date = document.querySelector('.date');                                  //find date
function showDate() {                                                          //func to set date
  date.textContent = new Date().toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'});
}
// 2. GREETING
const greeting = document.querySelector('.greeting');                          //find greeting
const name = document.querySelector('.name');                                  //find name
showTime();                                                                    //update time, date, greeting
function showGreeting() {                                                      //func to set greeting
  const timeOfDay = ['Good Night,', 'Good Morning,', 'Good Afternoon,', 'Good Evening,'];
  greeting.textContent = timeOfDay[Math.floor((new Date().getHours())/6)]
}
function setLocalStorage() {                                                   //func to save name & city to local storage
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);                      //save name & city to local storage before reload the page
function getLocalStorage() {                                                   //func to get name & city from local storage and write them to the page
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  } if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}
window.addEventListener('load', getLocalStorage);                              //write name & city from local storage to the page after load page
// 3. SLIDER
const body = document.querySelector('body');                                   //find body
const slideNext = document.querySelector('.slide-next');                       //find btn slide next bg
const SlidePrev = document.querySelector('.slide-prev');                       //find btn slide prev bg
let randomNum;                                                                 //make var for bg number
function getRandomNum() {                                                      //func to find random for bg number
  randomNum = Math.ceil(Math.random() * 20)
}
getRandomNum();                                                                //set random number for bg number
function setBg() {                                                             //func to set random bg
  const timeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/vladyka-nazarii/stage1-tasks/assets/images/${timeOfDay[Math.floor((new Date().getHours())/6)]}/${randomNum.toString().padStart(2, "0")}.webp`;
  img.onload = () => {      
    body.style.backgroundImage = `url(${img.src})`;
  }; 
}
setBg();                                                                       //set random bg
function getSlidePrev() {                                                      //func to change bg left (decrease)
  randomNum = (randomNum === 1) ? 20 : randomNum - 1;
  setBg()
}
function getSlideNext() {                                                      //func to change bg right (increase)
  randomNum = (randomNum === 20) ? 1 : randomNum + 1;
  setBg()
}
SlidePrev.addEventListener('click', getSlidePrev);                             //change bg after left click
slideNext.addEventListener('click', getSlideNext);                             //change bg after right click
function getSlide(event) {                                                     //func to change bg after left arrow or right arrow pressed
  if (event.code === 'ArrowLeft') {getSlidePrev()}
  if (event.code === 'ArrowRight') {getSlideNext()}
}
document.addEventListener('keydown', getSlide);                                //change bg by pressing arrow keys
// 4. WEATHER 
const weatherIcon = document.querySelector('.weather-icon');                   //find weather icon
const temperature = document.querySelector('.temperature');                    //find temperature
const weatherError = document.querySelector('.weather-error');                 //find weather error
const windSpeed = document.querySelector('.wind-speed');                       //find wind speed
const humidity = document.querySelector('.humidity');                          //find humidity
const weatherDescription = document.querySelector('.weather-description');     //find weather description
const city = document.querySelector('.city');                                  //find weather icon
if (city.value === '') {city.value = 'Minsk'};                                 //set default city
async function getWeather() {                                                  //func to update weather by city
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=26761a0144387591cefb99ec81c08657&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.weather == undefined) {
    weatherError.textContent = `Error! City not found!`;
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    windSpeed.textContent = '';
    humidity.textContent = '';
  } else {
  weatherError.textContent = '';
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1);
  windSpeed.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
  humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
  }
}
function setCity(event) {                                                      //func to set city
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}
city.addEventListener('keypress', setCity);                                    //update weather by pressing enter key
document.addEventListener('DOMContentLoaded', getWeather);                     //update weather after page fully loaded
// 5. QUOTES 
const changeQuote = document.querySelector('.change-quote');                   //find arrows to change quote
const quote = document.querySelector('.quote');                                //find quote
const author = document.querySelector('.author');                              //find author
async function getQuotes() {                                                   //func to generate new quote
  const quotes = `./js/quotes_en.json`;
  const res = await fetch(quotes);
  const data = await res.json();
  const i = Math.round(Math.random() * data.length)
  quote.textContent = `"${data[i].text}"`;
  author.textContent = data[i].author;
}
getQuotes();                                                                   //set new quote
changeQuote.addEventListener('click', getQuotes);                              //change quote by click on arrows
// 6. PLAYER
const playBtn = document.querySelector('.play');                               //find btn play
const prevBtn = document.querySelector('.play-prev');                          //find btn prev
const nextBtn = document.querySelector('.play-next');                          //find btn next
const audio = new Audio();                                                     //make audio player
let isPlay = false;                                                            //set is track playing to false
let playNum = 0;                                                               //set number of track in playlist to 0
function playAudio() {                                                         //func to play track
  if (isPlay) {
    audio.pause();
    isPlay = false;
    playBtn.classList.remove('pause');
  } else {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  isPlay = true;
  playBtn.classList.add('pause');
  playItems[0].classList.add('item-active');
  }
}
playBtn.addEventListener('click', playAudio);                                  //play track by click on play btn
function playPrev() {                                                          //func to play prev track
  if (playNum === 0) {
    playItems[playNum].classList.remove('item-active');
    playNum = playList.length - 1;
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    playItems[playNum].classList.add('item-active');
    if (!isPlay) {
      isPlay = true;
      playBtn.classList.add('pause');
    }
  } else {
    playItems[playNum].classList.remove('item-active');
    playNum--;
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    playItems[playNum].classList.add('item-active');
    if (!isPlay) {
      isPlay = true;
      playBtn.classList.add('pause');
    }
  }
}
function playNext() {                                                          //func to play next track
  if (playNum === playList.length - 1) {
    playItems[playNum].classList.remove('item-active');
    playNum = 0;
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    playItems[playNum].classList.add('item-active');
    if (!isPlay) {
      isPlay = true;
      playBtn.classList.add('pause');
    }
  } else {
    playItems[playNum].classList.remove('item-active');
    playNum++;
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    playItems[playNum].classList.add('item-active');
    if (!isPlay) {
      isPlay = true;
      playBtn.classList.add('pause');
    }
  }
}
prevBtn.addEventListener('click', playPrev);                                   //play play prev track by click on prev btn
nextBtn.addEventListener('click', playNext);                                   //play play next track by click on next btn
import playList from './playList.js';                                          //import playlist
const playListContainer = document.querySelector('.play-list');                //find playList container
playList.forEach(element => {                                                  //func to fill playList container with playlist
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = element.title;
  playListContainer.append(li)
})
const playItems = document.querySelectorAll('.play-item');                     //find all playlist items to make one active when playing
audio.onended = () => playNext();                                              //play next track when track ended