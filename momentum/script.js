/*---audio---*/
const playerPrevBtn = document.querySelector('.button-prev');
const playerPlayBtn = document.querySelector('.button-play');
const playerNextBtn = document.querySelector('.button-next');
const playlistItems = document.querySelectorAll('.playlist__item');
const audio = new Audio();
const playlist = ["1", "2", "3", "4"];
let currentSong = 0;
let currentTime = 0;
let isPlay = false;

function playPrevSong(){
    currentTime = 0;
    if(currentSong <= 0){
        currentSong = playlist.length -1;
        audioPlay();
    } else {
        currentSong--;
        audioPlay();
    }
}
function playNextSong() {
    currentTime = 0;
    if(currentSong >= playlist.length - 1){
        currentSong = 0;
        audioPlay();
    } else {
        currentSong++;
        audioPlay();
    }
}
function removeActive(item) {
    item.classList.remove('active');
}
function addActive(){
    for(let item of playlistItems){
        removeActive(item);
        // console.log(item.dataset.song);
        // console.log(playlist[currentSong]);
        if(playlist[currentSong] === item.dataset.song){
            item.classList.add('active');
        }
    }
}
function changeIcon(){
    if(isPlay) {
        playerPlayBtn.style.backgroundImage = "url('/momentum/assets/icons/pause.svg')";
    } else {
        playerPlayBtn.style.backgroundImage = "url('/momentum/assets/icons/play.svg')";
    }
}
function audioPause() {
    audio.pause();
    isPlay = false;
    changeIcon();
}
function audioPlay(){
    audio.src = `./assets/audio/${playlist[currentSong]}.mp3`;
    audio.currentTime = currentTime;
    audio.play();
    isPlay = true;
    changeIcon();
    addActive();
}
playerPlayBtn.addEventListener('click', function(){
    if(isPlay){
        currentTime = audio.currentTime;
        audioPause();
    } else {
        audioPlay();
    }
});
playerPrevBtn.addEventListener('click', playPrevSong);
playerNextBtn.addEventListener('click', playNextSong);

/*---time and date---*/
const time = document.querySelector('.time');
const dateBlock = document.querySelector('.date');
const greeting = document.querySelector('.greeting__phrase');

const daysOfWeek = ['Sanday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];
let date = new Date();
let partOfDay;

function checkDate(date) {
    let numberOfDay = date.getDay();
    let day = daysOfWeek[numberOfDay];
    let numberOfMonth = date.getMonth();
    let month = months[numberOfMonth];
    let dayOfMonth = date.getDate();
    dateBlock.textContent = `${day}, ${month} ${dayOfMonth}`
}

setInterval(changeTime, 1000);

function changePhrase(hours){
    if(hours > 24) {
        checkDate(date);
        greeting.textContent = "Good night";
    } else if(hours > 16){
        greeting.textContent = "Good evening";
    } else if (hours < 12 && hours >= 4) {
        greeting.textContent = "Good morning";
    }else if(hours > 12){
        hours = hours - 12;
        partOfDay = 'PM';
        greeting.textContent = "Good afternoon";
    }
}
function changeTime(){
    date = new Date();
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    changePhrase(hours);
    if(hours > 12){
        hours = hours - 12;
        partOfDay = 'PM';
    } else {
        partOfDay = 'AM';
    }
    if(minutes < 10) minutes = '0'+ minutes;
    if(seconds < 10) seconds = '0'+ seconds;
    time.textContent = `${hours}:${minutes}:${seconds} ${partOfDay}`;
}
checkDate(date);
changeTime();



