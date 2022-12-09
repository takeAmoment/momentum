let lang = 'en';
const enLang = document.querySelector('.en');
const ruLang = document.querySelector('.ru');

function checkLang(lang){
    if(lang === 'en'){
        enLang.classList.add('active');
    } else if(lang === 'ru'){
        ruLang.classList.add('active');
    }
}

/*---audio---*/
const playerPrevBtn = document.querySelector('.button-prev');
const playerPlayBtn = document.querySelector('.button-play');
const playerNextBtn = document.querySelector('.button-next');
const playlistItems = document.querySelectorAll('.playlist__item');
const progressBar = document.querySelector('.progress-bar');
const volume = document.querySelector('.volume__input');
const volumeIcon = document.querySelector('.volume__icon');

const audio = new Audio();
const playlist = ["1", "2", "3", "4"];
let currentSong = 0;
let currentTime = 0;
let isPlay = false;
let isVolume = true;
audio.volume = 0.4;
volume.style.background = `linear-gradient(to right, rgb(189, 169, 121) 0%, rgb(189, 169, 121) ${volume.value}%, rgb(200, 200, 200) ${volume.value}%, rgb(200, 200, 200) 100%)`;

function changeVolume(){
    audio.volume = volume.value / 100;
    volume.style.background = `linear-gradient(to right, rgb(189, 169, 121) 0%, rgb(189, 169, 121) ${volume.value}%, rgb(200, 200, 200) ${volume.value}%, rgb(200, 200, 200) 100%)`;
}
function showInput(){
    volume.classList.toggle('active');
}
function moveRange(){
    progressBar.value = audio.currentTime / audio.duration * 100;
    progressBar.style.background = `linear-gradient(to right, rgb(189, 169, 121) 0%, rgb(189, 169, 121) ${progressBar.value}%, rgb(200, 200, 200) ${progressBar.value}%, rgb(200, 200, 200) 100%)`;
    if (audio.currentTime === audio.duration) {
        playNextSong();
    }
}
function playPrevSong(){
    currentTime = 0;
    if(currentSong <= 0){
        currentSong = playlist.length -1;
        audioPlay(currentTime);
    } else {
        currentSong--;
        audioPlay(currentTime);
    }
}
function playNextSong() {
    currentTime = 0;
    if(currentSong >= playlist.length - 1){
        currentSong = 0;
        audioPlay(currentTime);
    } else {
        currentSong++;
        audioPlay(currentTime);
    }
}
function removeActive(item) {
    item.classList.remove('active');
}
function addActive(){
    for(let item of playlistItems){
        removeActive(item);
        if(playlist[currentSong] === item.dataset.song){
            item.classList.add('active');
        }
    }
}
function changeIcon(){
    if(isPlay) {
        playerPlayBtn.classList.add('paused');
    } else {
        playerPlayBtn.classList.remove('paused');
    }
}
function audioPause() {
    audio.pause();
    isPlay = false;
    changeIcon();
}
function audioPlay(currentTime){
    audio.src = `./assets/audio/${playlist[currentSong]}.mp3`;
    audio.currentTime = currentTime;
    audio.play();
    setInterval(() => moveRange(), 2000);
    isPlay = true;
    
    changeIcon();
    addActive();
}
playerPlayBtn.addEventListener('click', function(){
    if(isPlay){
        currentTime = audio.currentTime;
        audioPause();
    } else {
        audioPlay(currentTime);
    }
});
playerPrevBtn.addEventListener('click', playPrevSong);
playerNextBtn.addEventListener('click', playNextSong);
progressBar.addEventListener('change', function(){
    currentTime = progressBar.value * audio.duration / 100;
    audioPlay(currentTime);
});
volumeIcon.addEventListener('click', showInput);
volume.addEventListener('change', changeVolume);

/*---time and date---*/
const time = document.querySelector('.time');
const dateBlock = document.querySelector('.date');
const greeting = document.querySelector('.greeting__phrase');
let timeOfDay;

const daysOfWeek = {
    en:['Sanday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'],
    ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда',
    'Четверг', 'Пятница', 'Суббота'],
}
// const daysOfWeekRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда',
//         'Четверг', 'Пятница', 'Суббота'];
const months = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'],
    ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
}
let date = new Date();
let partOfDay;

function checkDate(date) {
    let numberOfDay = date.getDay();
    let day = daysOfWeek[lang][numberOfDay];
    let numberOfMonth = date.getMonth();
    let month = months[lang][numberOfMonth];
    let dayOfMonth = date.getDate();
    dateBlock.textContent = `${day}, ${month} ${dayOfMonth}`
}

setInterval(changeTime, 1000);

function changePhrase(hours, lang){
    let ruStartOfPhrase;
    if(hours >= 24) {
        checkDate(date, lang);
        timeOfDay = {
            en:"night",
            ru: "ночи",
        }
        ruStartOfPhrase = "Доброй";
    } else if(hours > 16){
        timeOfDay = {
            en: "evening",
            ru: "вечер",
        }
        ruStartOfPhrase = "Добрый";
    } else if (hours < 12 && hours >= 4) {
        timeOfDay= {
            en: "morning",
            ru: "утро",
        }
        ruStartOfPhrase = "Доброе";
    }else if(hours >= 12){
        hours = hours - 12;
        timeOfDay = {
            en: "afternoon",
            ru: "дня",
        }
        ruStartOfPhrase = "Доброго";
    }

    if(lang === "en"){
        greeting.textContent = `Good ${timeOfDay.en}`;
    } else if(lang === "ru"){
        greeting.textContent = `${ruStartOfPhrase} ${timeOfDay.ru}`
    }
    
    return timeOfDay.en;
}

function changeTime(lang){
    date = new Date();
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    changePhrase(hours, lang);
    if(hours > 12){
        hours = hours - 12;
        partOfDay = 'PM';
    } else if(hours === 12) {
        partOfDay = 'PM';
    } else {
        partOfDay = 'AM';
    }
    if(minutes < 10) minutes = '0'+ minutes;
    if(seconds < 10) seconds = '0'+ seconds;
    time.textContent = `${hours}:${minutes}:${seconds} ${partOfDay}`;
}
checkDate(date, lang);
changeTime(lang);

/*---quote----*/
const quoteText = document.querySelector('.quote__phrase');
const quoteAuthor = document.querySelector('.quote__author');
const quoteButton = document.querySelector('.update-icon');

// const url = 'https://type.fit/api/quotes';
const url = 'data.json';
let random;
function changeQuote(){
    getQuotes(lang);
}
function addQuote(data, random){
    quoteText.textContent = data[random].text;
    quoteAuthor.textContent = data[random].author;
}
function getRandomNumber(data){
    random = Math.floor(Math.random() * (data.length - 1));
    return random;
}

async function getQuotes(lang){
    const res = await fetch(url);
    const data = await res.json(res);
    random = getRandomNumber(data[lang]);
    addQuote(data[lang], random);
}

getQuotes(lang);

quoteButton.addEventListener('click', changeQuote);

/*----weather----*/
const weatherIcon = document.querySelector('.weather__icon');
const temperature = document.querySelector('.temperature');
const city = document.querySelector('.city');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

function addWeather(data){
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)} °C`;
    weatherDescription.textContent = data.weather[0].description;
    if(lang === "en"){
        wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity} %`;
    } else if(lang === "ru"){
        wind.textContent = `Скорость ветра: ${data.wind.speed} м/с`;
        humidity.textContent = `Влажность: ${data.main.humidity} %`;
    }
    
}
async function getWeather(lang){
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=d5d87ec30d8925c002198f5d389b0212&units=metric`;
    const res = await fetch(weatherUrl);
    const data = await res.json();
    addWeather(data);
}

getWeather(lang);
city.addEventListener('change', getWeather);

/*----slider----*/

const sliderPrev = document.querySelector('.slider-prev');
const sliderNext = document.querySelector('.slider-next');
const backgroundImg = document.querySelector('.wrapper');
let background;
let randomArr = [];
let index = 0;

function checkIsRandom(randomNumber, arr){
    if(!arr.includes(randomNumber)){
        return true;
    }
    return false;
}
function makeRandomArr(min, max){
    while(randomArr.length < 20) {
        let randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
        if(randomNumber < 10) randomNumber = "0"+ randomNumber;
        if(!checkIsRandom(randomNumber, randomArr)){
            return makeRandomArr(1, 20);
        } else {
            randomArr.push(randomNumber);
        } 

    }
    return randomArr;
}
function checkPartOfDay(){
    let date = new Date();
    let hours = date.getHours();
    background = changePhrase(hours);
    return background;
}
async function getBackgroud(index, randomArr){
    background = checkPartOfDay();
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${background}/${randomArr[index]}.jpg`;
    img.addEventListener('load', () => {
        backgroundImg.style.backgroundImage = `url(${img.src})`;
        backgroundImg.style.backgroundSize = "cover"
    })
    
}

randomArr = makeRandomArr(1, 20);
getBackgroud(index,randomArr);

function getNextImage(){
    if(index === randomArr.length - 1){
        index = 0;
        getBackgroud(index, randomArr);
    }
    index++;
    getBackgroud(index, randomArr);
}

function getPrevImage(){
    if(index === 0){
        index = randomArr.length -1;
        getBackgroud(index, randomArr);
    }
    index--;
    getBackgroud(index, randomArr)
}
sliderNext.addEventListener('click', getNextImage);
sliderPrev.addEventListener('click', getPrevImage);


/*------lang-----*/
const languages = document.querySelectorAll('.lang');

function getTranslate(lang){
    getWeather(lang);
    getQuotes(lang);
    checkDate(date, lang);
    changeTime(lang);
}
function deleteActive(){
    for(let elem of languages){
        elem.classList.remove('active');
    }
}
for(let elem of languages){
    elem.addEventListener('click', function(){
        deleteActive();
        elem.classList.add('active');
        lang = elem.dataset.lang;
        getTranslate(lang);
    })
}

/*-----local storage-----*/
const userName = document.querySelector('.greeting__username');

function setLocalStorage() {
    localStorage.setItem('name', userName.value);
    localStorage.setItem('lang', lang);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage(){
    if(localStorage.getItem('name')){
        userName.value = localStorage.getItem('name');
    };

    if(localStorage.getItem('lang')){
        lang = localStorage.getItem('lang');
        getTranslate(lang);
        
    };

    if(localStorage.getItem('city')){
        city.value = localStorage.getItem('city');
    }
    checkLang(lang);
}

window.addEventListener('load', getLocalStorage);