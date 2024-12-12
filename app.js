// script.js

const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");
const volumeControl = document.getElementById("volume");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");

const tracks = [
    { title: "Sare-la-makan-se-talab-hui", artist: " Ali Zafar", src: "music assets/sare-la-makan-se-talab-hui.mp3" },
    { title: "Tajdar-e-haram", artist: " Atif Aslam", src: "music assets/tajdar-e-haram.mp3" },
    { title: "Tu-kuja-man-kuja", artist: " Shiraz Uppal & Rafaqat Ali Khan", src: "music assets/tu-kuja-man-kuja.mp3" },
];

let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

// Load Track
function loadTrack(index) {
    const track = tracks[index];
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    audioPlayer.src = track.src;
    progressBar.value = 0;
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause(); // Pause audio
        playPauseBtn.classList.replace('ri-pause-fill', 'ri-play-fill'); // Switch icon to play
    } else {
        audioPlayer.play(); // Play audio
        playPauseBtn.classList.replace('ri-play-fill', 'ri-pause-fill'); // Switch icon to pause
    }
    isPlaying = !isPlaying; // Toggle playback state
});
// Next Track
nextBtn.addEventListener("click", () => {
    currentTrackIndex = isShuffle
        ? Math.floor(Math.random() * tracks.length)
        : (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.classList.replace('ri-play-fill');
});

// Previous Track
prevBtn.addEventListener("click", () => {
    currentTrackIndex =
        (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.classList.replace('ri-play-fill');
});


// Update Progress Bar
audioPlayer.addEventListener("timeupdate", () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    durationDisplay.textContent = formatTime(audioPlayer.duration);
});

// Seek
progressBar.addEventListener("input", () => {
    audioPlayer.currentTime =
        (progressBar.value / 100) * audioPlayer.duration;
});

// Volume Control
volumeControl.addEventListener("input", () => {
    audioPlayer.volume = volumeControl.value / 100;
});

// Format Time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Initialize Player
loadTrack(currentTrackIndex);
