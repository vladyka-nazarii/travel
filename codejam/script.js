import difficulties from './data/difficulties.js';
import ancientsData from './data/ancients.js';
import {greenCards, blueCards, brownCards} from './data/mythicCards/index.js';

function getRandomNum(count) {
  return Math.floor(Math.random() * count)
};
function setRandomSettings() {
  const randomAncient = getRandomNum(htmlAncients.length);
  const randomDifficulty = getRandomNum(htmlDifficulties.length);
  htmlAncients[randomAncient].classList.add("active");
  htmlDifficulties[randomDifficulty].classList.add("active");
  activeAncient = ancientsData[randomAncient];
  activedifficulty = difficulties[randomDifficulty]
};
const htmlAncients = document.querySelectorAll(".ancient-card");
const htmlDifficulties = document.querySelectorAll(".difficulty");
const htmlDeck = document.querySelector(".deck");
const htmlLastCard = document.querySelector(".last-card");
const htmlStageText = document.querySelectorAll(".stage-text");

let activeAncient;
let activedifficulty;
setRandomSettings();

const stages = Object.keys(activeAncient).filter(key => key.match('Stage'));
const colours = new Set();
Object.values(activeAncient).forEach(el => Object.keys(el).filter(key => key.match('Cards')).forEach(el => colours.add(el)));

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  } return array.slice(0)
}

function fillDeck(colour, difficulty) {
  const numOfCards = {};
  colours.forEach(el => {for (let i=0; i<stages.length; i++) {
    if (numOfCards[el]) {numOfCards[el] += activeAncient[stages[i]][el]}
    else {numOfCards[el] = 0; numOfCards[el] += activeAncient[stages[i]][el]}
  }});
  const cards = {};
  if (difficulty.id === 'veryeasy' || difficulty.id === 'veryhard') {
    cards[`${colour}${difficulty.id}`] = shuffle(allCards[`${colour}Cards`].filter(el => el.difficulty === `${difficulty.id.slice(4)}`));
    cards[`${colour}${difficulty.id}extended`] = shuffle(allCards[`${colour}Cards`].filter(el => el.difficulty === 'normal'));
  } else if (difficulty.id === 'easy' || difficulty.id === 'hard') {
  cards[`${colour}${difficulty.id}`] = shuffle(allCards[`${colour}Cards`].filter(el => (el.difficulty === `${difficulty.id}` || el.difficulty === 'normal')))
  } else cards[`${colour}${difficulty.id}`] = shuffle(allCards[`${colour}Cards`]);
  if (numOfCards[`${colour}Cards`] > cards[`${colour}${difficulty.id}`].length) {
    deck[`${colour}Cards`] = cards[`${colour}${difficulty.id}`].slice(0);
    for (let i = numOfCards[`${colour}Cards`] - cards[`${colour}${difficulty.id}`].length; i > 0; i--) {
      deck[`${colour}Cards`].push(cards[`${colour}${difficulty.id}extended`].pop())
    }
  } else {for (let i = 0; i < numOfCards[`${colour}Cards`]; i++) {
      if (deck[`${colour}Cards`]) {deck[`${colour}Cards`][i] = cards[`${colour}${difficulty.id}`].pop()}
      else {deck[`${colour}Cards`] = []; deck[`${colour}Cards`][i] = cards[`${colour}${difficulty.id}`].pop()};
    }
  }
}
const deck = {};
const allCards = {greenCards, blueCards, brownCards};
function filterCards() {
  colours.forEach(el => fillDeck(`${el.replace(/Cards/, '')}`, activedifficulty));
  Object.values(deck).forEach(el => shuffle(el))
};
filterCards();


let finalDeck;
function setFinalDeck() {
  finalDeck = [];
  stages.forEach((elStages, index) => {
    finalDeck[index] = [];
    colours.forEach(elColour => {
      for (let i = activeAncient[elStages][elColour]; i > 0; i--) {
      finalDeck[index].push(deck[elColour].pop())
      }
    })
  });
  finalDeck.forEach(el => shuffle(el));
  finalDeck = finalDeck.flat()
};
setFinalDeck();

function setStages() {
  const dots = {};
  dots.greenCards = document.querySelectorAll(".dot.green");
  dots.blueCards = document.querySelectorAll(".dot.blue");
  dots.brownCards = document.querySelectorAll(".dot.brown");
  stages.forEach((elStages, index) => {
    colours.forEach(elColour => {
      dots[elColour][index].innerHTML = activeAncient[elStages][elColour]
    })
  });
  htmlLastCard.style = "";
  htmlDeck.style = "background-image: url(./assets/mythicCardBackground.png);"
};
setStages();

htmlAncients.forEach((el, index) => el.addEventListener('click', () => {
  htmlAncients.forEach(element => element.classList.remove("active"));
  el.classList.add("active");
  activeAncient = ancientsData[index];
  setStages();
  filterCards();
  setFinalDeck()
}));
htmlDifficulties.forEach((el, index) => el.addEventListener('click', () => {
  htmlDifficulties.forEach(element => element.classList.remove("active"));
  el.classList.add("active");
  activedifficulty = difficulties[index];
  setStages();
  filterCards();
  setFinalDeck()
}));
htmlDeck.addEventListener('click', () => {
  changeStages()
  if (finalDeck.length > 0) htmlLastCard.style = `background-image: url(${finalDeck.shift().cardFace})`;
  if (finalDeck.length === 0) htmlDeck.style = "cursor: auto"
  });

function changeStages() {
  if (finalDeck.length > 0) {
    const dots = document.querySelectorAll(`.dot.${finalDeck[0].color}`);
    if (dots[0].innerHTML !== '0') dots[0].innerHTML = dots[0].innerHTML - 1
    else if (dots[1].innerHTML !== '0') dots[1].innerHTML = dots[1].innerHTML - 1
    else if (dots[2].innerHTML !== '0') dots[2].innerHTML = dots[2].innerHTML - 1
  }
  const allDots = document.querySelectorAll(".dot");
  let doneStage;
  if (doneStage == undefined && allDots[0].innerHTML + allDots[1].innerHTML + allDots[2].innerHTML === '000') {
    htmlStageText[0].classList.add("done")
  } if (doneStage == undefined && allDots[3].innerHTML + allDots[4].innerHTML + allDots[5].innerHTML === '000') {
    htmlStageText[1].classList.add("done")
  } if (doneStage == undefined && allDots[6].innerHTML + allDots[7].innerHTML + allDots[8].innerHTML === '000') {
    htmlStageText[2].classList.add("done")
  }
};