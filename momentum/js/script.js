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

import playList from './playList.js';                                          //import playlist
const prevBtn = document.querySelector('.prev-button');                        //find btn prev
const playBtn = document.querySelector('.play-button');                        //find btn play
const nextBtn = document.querySelector('.next-button');                        //find btn next
const playListContainer = document.querySelector('.playlist-container');       //find playList container
const playListItemContent = `
  <div class="item-container">
  <div class="item-cover">
    <div class="image-container">
      <img class="image-cover" src="" alt="cover">
    </div>
    <div class="icon-container">
      <svg viewBox="0 0 36 36" fill="#fff" class="item-play-icon playlist-icon">
        <path d="M12.233 7.68l15.75 10.124c.69.443.69 1.45 0 1.892L12.233 29.82a1.125 1.125 0 0 1-1.733-.947V8.627c0-.89.985-1.428 1.733-.947z"></path>
      </svg>
      <svg viewBox="0 0 100 100" fill="#fff" class="item-playing-icon playlist-icon">
        <g transform="rotate(180 50 50)">
          <rect height="72.4964" x="15" width="20">
            <animate attributeName="height" calcMode="spline" values="50;75;10;50" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1" repeatCount="indefinite" begin="-0.6666666666666666s" dur="1s"></animate>
          </rect>
          <rect height="11.5407" x="40" width="20">
            <animate attributeName="height" calcMode="spline" values="50;75;10;50" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1" repeatCount="indefinite" begin="0s" dur="1s"></animate>
          </rect>
          <rect height="50.9629" x="65" width="20">
            <animate attributeName="height" calcMode="spline" values="50;75;10;50" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1" repeatCount="indefinite" begin="-0.3333333333333333s" dur="1s"></animate>
          </rect>
        </g>
      </svg>
      <svg viewBox="0 0 24 24" fill="#fff" class="item-pause-icon playlist-icon">
        <path d="M10 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4zm8 0a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4z"></path>
      </svg>
    </div>
  </div>
  <div class="item-info">
    <div class="item-title"></div>
    <div class="item-author"></div>
  </div>
  <div class="item-duration"></div>
  </div>`;
playList.forEach(element => {                                                  //fill playList container with playlist
  const playListItem = document.createElement('div');
  playListItem.classList.add('item-component');
  playListItem.innerHTML = playListItemContent;
  playListItem.querySelector('.image-cover').src = element.cover;
  playListItem.querySelector('.item-title').textContent = element.title;
  playListItem.querySelector('.item-author').textContent = element.author;
  playListItem.querySelector('.item-duration').textContent = element.duration;
  playListContainer.append(playListItem)
});
const playItems = document.querySelectorAll('.item-component');                //find all playlist items to make one active when playing
const audio = new Audio();                                                     //make audio player
audio.volume = .75;
let isPlay = false;                                                            //set is track playing to false
let playNum = 0;                                                               //set number of track in playlist to 0
let pauseNum;
playItems[playNum].querySelector('.icon-container').classList.add('item-active');
const bigCover = document.querySelector('.big-cover-image');
const coverTitle = document.querySelector('.cover-title');
const coverAuthor = document.querySelector('.cover-author');
const playListBtn = document.querySelector('.playlist-button');
playListBtn.addEventListener('click', () => playListContainer.classList.toggle('hide-playlist'));
bigCover.src = playList[playNum].cover;
coverTitle.innerHTML = playList[playNum].title;
coverAuthor.innerHTML = playList[playNum].author;
function playAudio() {                                                         //func to play track
  if (isPlay) {
    if (playNum === pauseNum) {
      audio.pause();
      isPlay = false;
      playItems[playNum].querySelector('.icon-container').classList.remove('item-playing');
      playBtn.classList.remove('pause');
    } else {
      audio.src = playList[playNum].src;
      audio.currentTime = 0;
      audio.play();
      isPlay = true;
      pauseNum = playNum;
      playBtn.classList.add('pause');
      bigCover.src = playList[playNum].cover;
      coverTitle.innerHTML = playList[playNum].title;
      coverAuthor.innerHTML = playList[playNum].author;
      playItems[playNum].querySelector('.icon-container').classList.add('item-active');
      playItems[playNum].querySelector('.icon-container').classList.add('item-playing');
    }
  } else {
    if (playNum === pauseNum) {
      audio.play();
      isPlay = true;
      playBtn.classList.add('pause');
      playItems[playNum].querySelector('.icon-container').classList.add('item-playing');
    } else {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    pauseNum = playNum;
    playBtn.classList.add('pause');
    bigCover.src = playList[playNum].cover;
    coverTitle.innerHTML = playList[playNum].title;
    coverAuthor.innerHTML = playList[playNum].author;
    playItems[playNum].querySelector('.icon-container').classList.add('item-active');
    playItems[playNum].querySelector('.icon-container').classList.add('item-playing');
  }}
}
function playPrev() {                                                          //func to play prev track
  if (playNum === 0) {
    playItems[playNum].querySelector('.icon-container').classList.remove('item-active');
    playItems[playNum].querySelector('.icon-container').classList.remove('item-playing');
    playNum = playList.length - 1;
    playAudio();
  } else {
    playItems[playNum].querySelector('.icon-container').classList.remove('item-active');
    playItems[playNum].querySelector('.icon-container').classList.remove('item-playing');
    playNum--;
    playAudio();
  }
}
function playNext() {                                                          //func to play next track
  if (playNum === playList.length - 1) {
    playItems[playNum].querySelector('.icon-container').classList.remove('item-active');
    playItems[playNum].querySelector('.icon-container').classList.remove('item-playing');
    playNum = 0;
    playAudio();
  } else {
    playItems[playNum].querySelector('.icon-container').classList.remove('item-active');
    playItems[playNum].querySelector('.icon-container').classList.remove('item-playing');
    playNum++;
    playAudio();
  }
}
playBtn.addEventListener('click', playAudio);                                  //play track by click on play btn
prevBtn.addEventListener('click', playPrev);                                   //play play prev track by click on prev btn
nextBtn.addEventListener('click', playNext);                                   //play play next track by click on next btn
playItems.forEach((element, index) => element.addEventListener('click', () => {
  if (playNum !== index) {
    playItems[playNum].querySelector('.icon-container').classList.remove('item-active');
    playItems[playNum].querySelector('.icon-container').classList.remove('item-playing');
    playNum = index;
  }
  playAudio()
}));
audio.onended = () => playNext();                                              //play next track when track ended
// 6. ADDITIONAL FUNCTIONAL
function someAction(event) {
  if (event.target.nodeName === 'BODY') {
    if (event.code === 'ArrowLeft') {getSlidePrev()}                             //func to change bg by left arrow
    if (event.code === 'ArrowRight') {getSlideNext()}                            //func to change bg by right arrow
    if (event.code === 'ArrowUp') {playPrev()}                                   //func to play prev track by up arrow
    if (event.code === 'ArrowDown') {playNext()}                                 //func to play next track by down arrow
    if (event.code === 'Space') {playAudio()}                                    //func to play audio by space
    if (event.code === 'Enter') {getQuotes()}                                    //func to change quote by enter
  }
}
document.addEventListener('keydown', someAction);                                //some action by pressing keys

function setName(event) {                                                      //func to set name
  if (event.code === 'Enter') {
    name.blur();
  }
}
name.addEventListener('keypress', setName);

function setLocalStorage() {                                                   //func to save name & city to local storage
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('playNum', playNum);
  localStorage.setItem('pauseNum', pauseNum);
  localStorage.setItem('duration', audio.currentTime);
}
function getLocalStorage() {                                                   //func to get name & city from local storage and write them to the page
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  } if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  // if(localStorage.getItem('playNum')) {
  //   console.log('Set playNum');
  //   playNum = localStorage.getItem('playNum');
  // } if(localStorage.getItem('city')) {
  //   city.value = localStorage.getItem('city');
  // } if(localStorage.getItem('city')) {
  //   city.value = localStorage.getItem('city');
  // }
}

window.addEventListener('beforeunload', setLocalStorage);                      //save name & city to local storage before reload the page
window.addEventListener('load', getLocalStorage);                              //write name & city from local storage to the page after load page


//click volume slider to change volume
const volumeSlider = document.querySelector(".volume-slider");
volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  document.querySelector(".volume-percentage").style.width = newVolume * 100 + '%';
}, false)
