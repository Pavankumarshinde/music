console.log("Welcome Musick");

let index = 0;
let audioElement = new Audio('song/0.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let songItems = Array.from(document.getElementsByClassName('song1'));
let backward = document.getElementById('backward');
let forward = document.getElementById('forward');
let masterBarr = document.getElementById('master1');
let obe = document.getElementsByClassName('obesity');
let text = document.getElementById('text');

let songs = [
    { songName: "Aao milo chale", filepath: "song/0.mp3", coverpath: "covers/0.png" },
    { songName: "Baato baato main", filepath: "song/1.mp3", coverpath: "covers/1.png" },
    { songName: "paisa hai to", filepath: "song/2.mp3", coverpath: "covers/2.png" },
    { songName: "Sunday", filepath: "song/3.mp3", coverpath: "covers/3.png" },
    { songName: "Sha-Dobara", filepath: "song/4.mp3", coverpath: "covers/4.png" },
    { songName: "Fix- you", filepath: "song/5.mp3", coverpath: "covers/5.png" },
    { songName: "kyu- dhunde ", filepath: "song/6.mp3", coverpath: "covers/6.png" },
    { songName: "Aao", filepath: "song/7.mp3", coverpath: "covers/7.png" }
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName('songname')[0].innerHTML = songs[i].songName;
});

function playPause() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        
        // element.target.add('fa-pause-circle');
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        obe[index].style.opacity = 1; // Set opacity to 1 when playing
    } else {
        audioElement.pause();
        masterplay.classList.add('fa-play-circle');
        masterplay.classList.remove('fa-pause-circle');
        obe[index].style.opacity = 0.5; // Set opacity to 0.5 when paused
    }
}

function changeSong(newIndex) {
    // Set obesity to 0 for all GIFs except the one at the current index


    index = newIndex;
    text.innerText = songs[index].songName;
    masterBarr.src = songs[index].coverpath;
    audioElement.src = songs[index].filepath;
    // element.target.classList.remove('fa-play-circle');
    //     element.target.classList.add('fa-pause-circle');
    playPause();
    for (let i = 0; i < obe.length; i++) {
        if (i !== index) {
            obe[i].style.opacity = 0;
        }
    }
}

masterplay.addEventListener('click', playPause);

backward.addEventListener('click', () => {
    let newIndex = (index - 1 + songs.length) % songs.length;
    changeSong(newIndex);
});

forward.addEventListener('click', () => {
    let newIndex = (index + 1) % songs.length;
    changeSong(newIndex);
});

audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myprogressbar.value = progress;
});

myprogressbar.addEventListener('input', () => {
    audioElement.currentTime = myprogressbar.value * audioElement.duration / 100;
});

songItems.forEach((element) => {
    element.addEventListener('click', () => {
        let clickedIndex = parseInt(element.getElementsByClassName('fa-play-circle')[0].id);
        changeSong(clickedIndex);
    });
});

