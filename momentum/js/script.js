//8. TRANSLATE
let currentLang = {
  lang: 'en',
  date: 'en-US',
  greetings: ['Good Night,', 'Good Morning,', 'Good Afternoon,', 'Good Evening,'],
  name: "[Enter name]",
  city: "[Enter city]",
  cityDefault: 'Minsk',
  cityError: 'Error! City not found!',
  weather: 'en',
  wind: 'Wind speed: ',
  speed: ' m/s',
  humidity: 'Humidity: ',
  quotes: './js/quotes_en.json',
  settings: ['Time', 'Date', 'Greeting', 'Quote', 'Weather', 'Audioplayer', 'To Do List'],
  settingsMain: ['Language', 'Background', 'Tags', 'Add']
};
const enLang = {
  lang: 'en',
  date: 'en-US',
  greetings: ['Good Night,', 'Good Morning,', 'Good Afternoon,', 'Good Evening,'],
  name: "[Enter name]",
  city: "[Enter city]",
  cityDefault: 'Minsk',
  cityError: 'Error! City not found!',
  weather: 'en',
  wind: 'Wind speed: ',
  speed: ' m/s',
  humidity: 'Humidity: ',
  quotes: './js/quotes_en.json',
  settings: ['Time', 'Date', 'Greeting', 'Quote', 'Weather', 'Audioplayer', 'To Do List'],
  settingsMain: ['Language', 'Background', 'Tags', 'Add']
};
const ruLang = {
  lang: 'ru',
  date: 'ru-RU',
  greetings: ['Доброй ночи,', 'Доброе утро,', 'Добрый день,', 'Добрый вечер,'],
  name: "[Введите имя]",
  city: "[Введите город]",
  cityDefault: 'Минск',
  cityError: 'Ошибка! Город не найден!',
  weather: 'ru',
  wind: 'Скорость ветра: ',
  speed: ' м/с',
  humidity: 'Влажность: ',
  quotes: './js/quotes_ru.json',
  settings: ['Время', 'Дата', 'Приветсвие', 'Цитаты', 'Погода', 'Аудиоплеер', 'Задачи'],
  settingsMain: ['Язык', 'Фон', 'Теги', 'Добавить']
};
document.querySelector('.city').placeholder = currentLang.city;
document.querySelector('.name').placeholder = currentLang.name;


// 1. TIME & DATE

//update time, date, greeting every 1 sec
const time = document.querySelector('.time');
function showTime() {
  time.textContent = new Date().toLocaleTimeString();
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}
const date = document.querySelector('.date');
function showDate() {
  const currentDate = new Date().toLocaleDateString(currentLang.date, {weekday: 'long', month: 'long', day: 'numeric'});
  date.textContent = currentDate[0].toUpperCase() + currentDate.slice(1);
}

// 2. GREETING

//func to set greeting
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
showTime();
function showGreeting() {
  const timeOfDay = currentLang.greetings;
  greeting.textContent = timeOfDay[Math.floor((new Date().getHours())/6)]
}

// 3. SLIDER

const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
let randomNum;
function getRandomNum() {                                                      
  randomNum = Math.ceil(Math.random() * 20)
}
getRandomNum();

//func to set random bg from github
function setGithubBg() {
  const timeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/vladyka-nazarii/stage1-tasks/assets/images/${timeOfDay[Math.floor((new Date().getHours())/6)]}/${randomNum.toString().padStart(2, "0")}.webp`;
  img.onload = () => {body.style.backgroundImage = `url(${img.src})`};
}

//func to set bg
function setBg() {
  if (document.querySelector("#git").checked) setGithubBg();
  if (document.querySelector("#unsplash").checked) setUnsplashBg();
  if (document.querySelector("#flickr").checked) setFlickrBg();
}

//startup set bg
if (localStorage.getItem('photoSource') === 'github') {setGithubBg()}
else if (localStorage.getItem('photoSource') === 'unsplash') {setUnsplashBg()}
else if (localStorage.getItem('photoSource') === 'flickr') {setFlickrBg()}
else {setBg()};

//func to change bg left (decrease)
function getSlidePrev() {
  randomNum = (randomNum === 1) ? 20 : randomNum - 1;
  setBg()
}

//func to change bg right (increase)
function getSlideNext() {
  randomNum = (randomNum === 20) ? 1 : randomNum + 1;
  setBg()
}

//change bg after left click
slidePrev.addEventListener('click', getSlidePrev);
//change bg after right click
slideNext.addEventListener('click', getSlideNext);

// 4. WEATHER

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherError = document.querySelector('.weather-error');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
if (city.value === '') {city.value = currentLang.cityDefault};

//func to update weather by city
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${currentLang.weather}&appid=26761a0144387591cefb99ec81c08657&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.weather == undefined) {
    weatherError.textContent = currentLang.cityError;
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
  windSpeed.textContent = `${currentLang.wind}${Math.round(data.wind.speed)}${currentLang.speed}`;
  humidity.textContent = `${currentLang.humidity}${Math.round(data.main.humidity)}%`;
  }
}

//func to set city
function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

//update weather by pressing enter key
city.addEventListener('keypress', setCity);

//update weather after page fully loaded
document.addEventListener('DOMContentLoaded', getWeather);

// 5. QUOTES

const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

//func to generate new quote
async function getQuotes() {
  const quotes = currentLang.quotes;
  const res = await fetch(quotes);
  const data = await res.json();
  const i = Math.round(Math.random() * data.length)
  quote.textContent = `"${data[i].text}"`;
  author.textContent = data[i].author;
}
getQuotes();
//change quote by click on arrows
changeQuote.addEventListener('click', getQuotes);

// 6. PLAYER

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

import playListOrig from './playList.js';                                          //import playlist
let playList = playListOrig.slice(0);
const prevBtn = document.querySelector('.prev-button');                        //find btn prev
const playBtn = document.querySelector('.play-button');                        //find btn play
const nextBtn = document.querySelector('.next-button');                        //find btn next
const playListContainer = document.querySelector('.playlist-container');       //find playList container

//fill playList container with playlist items
function genPlayList() {
  playList.forEach(element => {
    const playListItem = document.createElement('div');
    playListItem.classList.add('item-component');
    playListItem.innerHTML = playListItemContent;
    playListItem.querySelector('.image-cover').src = element.cover;
    playListItem.querySelector('.item-title').textContent = element.title;
    playListItem.querySelector('.item-author').textContent = element.author;
    playListItem.querySelector('.item-duration').textContent = element.duration;
    playListContainer.append(playListItem)
  });
}
genPlayList();
let playItems = document.querySelectorAll('.item-component');                //find all playlist items to make one active when playing
const audio = new Audio();                                                     //make audio player
let isPlay = false;                                                            //set is track playing to false
let playNum = 0;                                                               //set number of track in playlist to 0
let pauseNum;

const bigCover = document.querySelector('.big-cover-image');
const coverTitle = document.querySelector('.cover-title');
const coverAuthor = document.querySelector('.cover-author');
const playListBtn = document.querySelector('.playlist-button');
const current = document.querySelector(".current");
const duration = document.querySelector(".duration");
playListBtn.addEventListener('click', () => {
  playListContainer.classList.toggle('hide-playlist');
  slidePrev.classList.toggle('close-playlist');
});

//set player config
function setPlayer() {
  // if (document.querySelector('item-active') !== null) {document.querySelector('item-active').classList.remove('item-active')};
  audio.src = playList[playNum].src;
  bigCover.src = playList[playNum].cover;
  coverTitle.innerHTML = playList[playNum].title;
  coverAuthor.innerHTML = playList[playNum].author;
  duration.innerHTML = playList[playNum].duration;
  playItems[playNum].querySelector('.icon-container').classList.add('item-active')
}
setPlayer();

//func to play track
function playAudio() {
  if (isPlay) {
    if (playNum === pauseNum) {
      audio.pause();
      isPlay = false;
      playItems[playNum].querySelector('.icon-container').classList.remove('item-playing');
      playBtn.classList.remove('pause');
      playBtn.title = "Play"
    } else {
      setPlayer();
      audio.currentTime = 0;
      audio.play();
      isPlay = true;
      pauseNum = playNum;
      playBtn.classList.add('pause');
      playItems[playNum].querySelector('.icon-container').classList.add('item-playing');
      playBtn.title = "Play";
      if (playNum === 0 && repeat !== 1) prevBtn.classList.add('inactive')
      else prevBtn.classList.remove('inactive');
      if (playNum === playList.length - 1 && repeat !== 1) nextBtn.classList.add('inactive')
      else nextBtn.classList.remove('inactive')
    }
  } else {
    if (playNum === pauseNum) {
      audio.play();
      isPlay = true;
      playBtn.classList.add('pause');
      playItems[playNum].querySelector('.icon-container').classList.add('item-playing');
      playBtn.title = "Pause"
    } else {
    setPlayer();
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    pauseNum = playNum;
    playBtn.classList.add('pause');
    playItems[playNum].querySelector('.icon-container').classList.add('item-playing');
    playBtn.title = "Pause";
    if (playNum === 0 && repeat !== 1) prevBtn.classList.add('inactive')
    else prevBtn.classList.remove('inactive');
    if (playNum === playList.length - 1 && repeat !== 1) nextBtn.classList.add('inactive')
    else nextBtn.classList.remove('inactive')
  }}
}

//func to play prev track
function playPrev() {
  if (audio.currentTime < 5) {
    if (playNum === 0) {
      if (repeat === 1) {
        playItems[playNum].querySelector('.icon-container').classList.remove('item-active');
        playItems[playNum].querySelector('.icon-container').classList.remove('item-playing');
        playNum = playList.length - 1;
        playAudio();
        playItems[playNum].scrollIntoView({block: "end", behavior: "smooth"})
      }
    } else {
      playItems[playNum].querySelector('.icon-container').classList.remove('item-active');
      playItems[playNum].querySelector('.icon-container').classList.remove('item-playing');
      playNum--;
      playAudio();
      playItems[playNum].scrollIntoView({block: "end", behavior: "smooth"})
    }
  } else {
    audio.currentTime = 0;
    if (repeat !== 1) prevBtn.classList.add('inactive')
  }
}
//func to play next track
function playNext() {
  if (playNum === playList.length - 1) {
    if (repeat === 1) {
      playItems[playNum].querySelector('.icon-container').classList.remove('item-active');
      playItems[playNum].querySelector('.icon-container').classList.remove('item-playing');
      playNum = 0;
      playAudio();
      playItems[playNum].scrollIntoView({block: "end", behavior: "smooth"})
    }
  } else {
    playItems[playNum].querySelector('.icon-container').classList.remove('item-active');
    playItems[playNum].querySelector('.icon-container').classList.remove('item-playing');
    playNum++;
    playAudio();
    playItems[playNum].scrollIntoView({block: "end", behavior: "smooth"})
  }
}
playBtn.addEventListener('click', playAudio);                                  //play track by click on play btn
prevBtn.addEventListener('click', playPrev);                                   //play play prev track by click on prev btn
nextBtn.addEventListener('click', playNext);                                   //play play next track by click on next btn
function clickOnItem() {
  playItems.forEach((element, index) => element.addEventListener('click', () => {
    if (playNum !== index) {
      playItems[playNum].querySelector('.icon-container').classList.remove('item-active');
      playItems[playNum].querySelector('.icon-container').classList.remove('item-playing');
      playNum = index
    }
    playAudio()
  }))
}
clickOnItem();

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

//check audio percentage and update time accordingly
setInterval(() => {
  const progressBar = document.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  current.textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

//click on timeline to skip around
const timeline = document.querySelector(".progress-bar-component");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

//click volume slider to change volume
const volumeSlider = document.querySelector(".volume-slider");
volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  if (audio.muted) {audio.muted = !audio.muted};
  audio.volume = newVolume;
  document.querySelector(".volume-percentage").style.width = newVolume * 100 + '%';
  if (audio.volume <= 0.5) {
    document.querySelector(".full-volume").classList.remove("hide-volume");
    document.querySelector(".half-volume").classList.remove("hide-volume");
    document.querySelector(".mute-volume").classList.remove("show-volume");
    document.querySelector(".full-volume").classList.add("hide-volume")
  }
  else {
    document.querySelector(".full-volume").classList.remove("hide-volume");
    document.querySelector(".half-volume").classList.remove("hide-volume");
    document.querySelector(".mute-volume").classList.remove("show-volume")
  }
}, false)

let oldVolume;
document.querySelector(".volume-button").addEventListener("click", () => {
  const volumeEl = document.querySelector(".volume-percentage");
  audio.muted = !audio.muted;
  if (audio.muted) {
    document.querySelector(".full-volume").classList.add("hide-volume");
    document.querySelector(".half-volume").classList.add("hide-volume");
    document.querySelector(".mute-volume").classList.add("show-volume");
    oldVolume = window.getComputedStyle(volumeEl).width;
    volumeEl.style.width = 0 + '%';
  } else {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    document.querySelector(".half-volume").classList.remove("hide-volume");
    document.querySelector(".mute-volume").classList.remove("show-volume");
    volumeEl.style.width = oldVolume;
    if ((parseInt(oldVolume) / parseInt(sliderWidth)) > 0.5) {
      document.querySelector(".full-volume").classList.remove("hide-volume");
    }
  }
});

const repeatBtn = document.querySelector(".repeat-button");
const repeatSvg = document.querySelector(".repeat-svg");
const repeatIcon = document.querySelector(".repeat-icon");
const repeatOneIcon = document.querySelector(".repeat-one-icon");
let repeat = 1;
repeatSvg.classList.add("repeat-active");
repeatBtn.title = "Repeat Playlist";
repeatSvg.addEventListener('click', () => {
  if (repeat === 0) {
    repeatSvg.classList.add("repeat-active");
    repeatBtn.title = "Repeat Playlist";
    if (playNum === 0) prevBtn.classList.remove('inactive');
    if (playNum === playList.length - 1) nextBtn.classList.remove('inactive');
    repeat++
  } else if (repeat === 1) {
    repeatIcon.classList.add("repeat-none");
    repeatOneIcon.classList.add("repeat-display");
    repeatBtn.title = "Repeat Track";
    if (playNum === 0) prevBtn.classList.add('inactive');
    if (playNum === playList.length - 1) nextBtn.classList.add('inactive');
    repeat++
  } else if (repeat === 2) {
    repeatOneIcon.classList.remove("repeat-display");
    repeatIcon.classList.remove("repeat-none");
    repeatSvg.classList.remove("repeat-active");
    repeatBtn.title = "No Repeat";
    if (playNum === 0) prevBtn.classList.add('inactive');
    if (playNum === playList.length - 1) nextBtn.classList.add('inactive');
    repeat = 0
  };
});

//activate prev button after 5 sec playing
function setActivePrevBtn() {
  if (audio.currentTime > 5) prevBtn.classList.remove('inactive');
  setTimeout(setActivePrevBtn, 1000)
}
setActivePrevBtn();

//play next track when track ended
audio.onended = () => {
  if (playNum === playList.length - 1 && repeat !== 1) {
    isPlay = false;
    audio.currentTime = 0;
    playItems[playNum].querySelector('.icon-container').classList.remove('item-playing');
    playBtn.classList.remove('pause')
  } else if (repeat === 2) {isPlay = false; playAudio()}
  else playNext()
}

//shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function shufflePlaylist() {
  playListContainer.innerHTML = '';
  shuffle(playList);
  genPlayList();
  playItems = document.querySelectorAll('.item-component');
  setPlayer();
}
function returnShuffle() {
  playListContainer.innerHTML = '';
  playList = playListOrig.slice(0);
  genPlayList();
  playItems = document.querySelectorAll('.item-component');
  setPlayer();
}

const shuffleBtn = document.querySelector(".shuffle-button");
const shuffleSvg = document.querySelector(".shuffle-svg");
let shuff = false;
shuffleBtn.addEventListener('click', () => {
  if (shuff === false) {
    shuffleSvg.classList.add("repeat-active");
    shufflePlaylist();
    clickOnItem();
    shuff = !shuff;
    isPlay = false;
    playBtn.classList.remove('pause');
    playBtn.title = "Play"
  } else {
    shuffleSvg.classList.remove("repeat-active");
    returnShuffle();
    clickOnItem();
    shuff = !shuff;
    isPlay = false;
    playBtn.classList.remove('pause');
    playBtn.title = "Play"
  }
});

//10. SETTINGS

const state = {
  language: 'en',
  photoSource: 'github',
  time: true,
  date: true,
  greeting: true,
  quote: true,
  weather: true,
  audio: true,
  todolist: true,
  tags: document.querySelector(".bg-tags").value
}
//show settings
document.querySelector(".setting-icon").addEventListener('click', () => {
  document.querySelector(".setting-icon").classList.toggle("toggle");
  document.querySelector(".setting-wrapper").classList.toggle("show-settings");
  state.tags = document.querySelector(".bg-tags").value;
});

//hide settings by click outside
document.addEventListener('click', event => {
  if (!document.querySelector(".setting-container").contains(event.target) &&
  !document.querySelector(".setting-icon").contains(event.target)) {
    document.querySelector(".setting-icon").classList.remove("toggle");
    document.querySelector(".setting-wrapper").classList.remove("show-settings");
    state.tags = document.querySelector(".bg-tags").value;
  }
})

//hide elements in settings
document.querySelectorAll('.slide-toggle').forEach((element, index) => element.addEventListener('click', () => {
  const components = [
    document.querySelector(".time"),
    document.querySelector(".date"),
    document.querySelector(".greeting-container"),
    document.querySelector(".quote-div"),
    document.querySelector(".weather"),
    document.querySelector(".player"),
    document.querySelector(".todolist")
  ];
  const states = ['time', 'date', 'greeting', 'quote', 'weather', 'audio', 'todolist'];
  if (element.querySelector(".checkbox").checked === true) {
    components[index].classList.add("hide");
    if (index === 5) {slidePrev.classList.add('close-playlist')};
    element.querySelector(".checkbox").checked = false;
    state[states[index]] = false;
  }
  else {
    components[index].classList.remove("hide");
    if (index === 5) slidePrev.classList.remove('close-playlist');
    element.querySelector(".checkbox").checked = true;
    state[states[index]] = true;
  }
}));

function setLang() {
  showTime();
  getWeather();
  getQuotes();
  document.querySelector('.city').placeholder = currentLang.city;
  document.querySelector('.name').placeholder = currentLang.name;
  if (city.value === 'Минск' || city.value === 'Minsk') {city.value = currentLang.cityDefault};
  state.language = currentLang.lang;
  document.querySelector('.lang').querySelector('.setting-name').innerHTML = currentLang.settingsMain[0];
  document.querySelector('.bg').querySelector('.setting-name').innerHTML = currentLang.settingsMain[1];
  document.querySelector('.tags').querySelector('.setting-name').innerHTML = currentLang.settingsMain[2];
  document.querySelector('.title').innerHTML = currentLang.settings[6];
  document.querySelector('.add-todo').innerHTML = currentLang.settingsMain[3];
  document.querySelectorAll(".slide-toggle").forEach((element, index) => {
    element.querySelector(".setting-name").innerHTML = currentLang.settings[index]
  });
};

document.querySelector(".en-lang").addEventListener('click', () => {
  if (document.querySelector(".en-lang").querySelector(".lang-radio").value !== currentLang.lang) {
    currentLang = enLang;
    setLang();
  }
})
document.querySelector(".ru-lang").addEventListener('click', () => {
  if (document.querySelector(".ru-lang").querySelector(".lang-radio").value !== currentLang.lang) {
  currentLang = ruLang;
  setLang();
}
})

//func to save name & city to local storage
function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('playNum', playNum);
  localStorage.setItem('pauseNum', pauseNum);
  localStorage.setItem('duration', audio.currentTime);
  localStorage.setItem('volume', audio.volume);
  localStorage.setItem('language', state.language);
  localStorage.setItem('photoSource', state.photoSource);
  localStorage.setItem('tags', state.tags);
  localStorage.setItem('time', state.time);
  localStorage.setItem('date', state.date);
  localStorage.setItem('greeting', state.greeting);
  localStorage.setItem('quote', state.quote);
  localStorage.setItem('weather', state.weather);
  localStorage.setItem('audio', state.audio);
  localStorage.setItem('todolist', state.todolist);
}

//func to get name & city from local storage and write them to the page
function getLocalStorage() {
  if (localStorage.getItem('name')) {name.value = localStorage.getItem('name')};
  if (localStorage.getItem('city')) {city.value = localStorage.getItem('city')};
  playItems[playNum].querySelector('.icon-container').classList.remove('item-active');
  if (localStorage.getItem('playNum')) {playNum = +localStorage.getItem('playNum')};
  if (localStorage.getItem('pauseNum')) {pauseNum = +localStorage.getItem('pauseNum')};
  setPlayer();
  if (localStorage.getItem('duration')) {audio.currentTime = localStorage.getItem('duration')};
  if (localStorage.getItem('volume')) {
    audio.volume = localStorage.getItem('volume');
    document.querySelector(".volume-percentage").style.width = (audio.volume * 100) + '%';
    if (localStorage.getItem('volume') <= 0.5) {document.querySelector(".full-volume").classList.add("hide-volume")}
  };
  if (localStorage.getItem('language')) {
    if (localStorage.getItem('language') === 'en') {
      document.querySelector("#en").checked = true;
      currentLang = enLang;
      setLang();
    } else if (localStorage.getItem('language') === 'ru') {
      document.querySelector("#ru").checked = true;
      currentLang = ruLang;
      setLang();
    }
  };
  if (localStorage.getItem('photoSource')) {
    if (localStorage.getItem('photoSource') === 'github') {
      document.querySelector("#git").checked = true;
      state.photoSource = 'github';
      document.querySelector(".tags").classList.add("hide-tags");
    } else if (localStorage.getItem('photoSource') === 'unsplash') {
      document.querySelector("#unsplash").checked = true;
      state.photoSource = 'unsplash';
    } else if (localStorage.getItem('photoSource') === 'flickr') {
      document.querySelector("#flickr").checked = true;
      state.photoSource = 'flickr';
    }
  };
  if (localStorage.getItem('tags')) {
    document.querySelector(".bg-tags").value = localStorage.getItem('tags');
    state.tags = localStorage.getItem('tags');
  };
  if (localStorage.getItem('time')) {
    if (localStorage.getItem('time') === 'false') {
      document.querySelector("#time").checked = false;
      state.time = false;
      document.querySelector(".time").classList.add("hide")
    }
  };
  if (localStorage.getItem('date')) {
    if (localStorage.getItem('date') === 'false') {
      document.querySelector("#date").checked = false;
      state.date = false;
      document.querySelector(".date").classList.add("hide")
    }
  };
  if (localStorage.getItem('greeting')) {
    if (localStorage.getItem('greeting') === 'false') {
      document.querySelector("#greeting").checked = false;
      state.greeting = false;
      document.querySelector(".greeting-container").classList.add("hide")
    }
  };
  if (localStorage.getItem('quote')) {
    if (localStorage.getItem('quote') === 'false') {
      document.querySelector("#quote").checked = false;
      state.quote = false;
      document.querySelector(".quote-div").classList.add("hide")
    }
  };
  if (localStorage.getItem('weather')) {
    if (localStorage.getItem('weather') === 'false') {
      document.querySelector("#weather").checked = false;
      state.weather = false;
      document.querySelector(".weather").classList.add("hide")
    }
  };
  if (localStorage.getItem('audio')) {
    if (localStorage.getItem('audio') === 'false') {
      document.querySelector("#audio").checked = false;
      state.audio = false;
      document.querySelector(".player").classList.add("hide");
      slidePrev.classList.add('close-playlist')
    }
  };
  if (localStorage.getItem('todolist')) {
    if (localStorage.getItem('todolist') === 'false') {
      document.querySelector("#todolist").checked = false;
      state.todolist = false;
      document.querySelector(".todolist").classList.add("hide")
    }
  };
}
window.addEventListener('beforeunload', setLocalStorage);                      //save name & city to local storage before reload the page
window.addEventListener('load', getLocalStorage);                              //write name & city from local storage to the page after load page

//9. BACKGROUND API

async function setUnsplashBg() {
  const img = new Image();
  const tags = document.querySelector(".bg-tags");
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags.value}&client_id=517-gEX_Tnf0NtLsR0gjynwVeAY49jH3wddAqS8S0x0`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = data.urls.regular;
  img.onload = () => {body.style.backgroundImage = `url(${img.src})`};
}

async function setFlickrBg() {
  const img = new Image();
  const tags = document.querySelector(".bg-tags");
  let defaultTag = 'nature';
  if (tags.value !== '') {defaultTag = tags.value};
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=43de05dd9651aa75b4427038136f4a0f&tags=${defaultTag}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = data.photos.photo[randomNum].url_l;
  img.onload = () => {body.style.backgroundImage = `url(${img.src})`};
}

document.querySelector(".git").addEventListener('click', () => {
  document.querySelector(".tags").classList.add("hide-tags");
  state.photoSource = 'github';
});
document.querySelector(".unsplash").addEventListener('click', () => {
  document.querySelector(".tags").classList.remove("hide-tags");
  state.photoSource = 'unsplash';
});
document.querySelector(".flickr").addEventListener('click', () => {
  document.querySelector(".tags").classList.remove("hide-tags");
  state.photoSource = 'flickr';
});

//11. TO DO LIST

function genToDoList() {
  const toDoList = document.querySelector(".tasks");
  const toDoItem = document.createElement('li');
  const toDoText = document.querySelector(".todo-text");
  toDoItem.innerHTML = toDoText.value;
  toDoItem.addEventListener('click', () => toDoItem.classList.add("complited"));
  toDoList.append(toDoItem);
  toDoText.value = ''
}
document.querySelector(".add-todo").addEventListener('click', genToDoList)
