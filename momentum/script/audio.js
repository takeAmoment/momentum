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