const songs = [
  {
    name: "Faded",
    artist: "Alan Walker",
    audio: "../music/Faded.mp3",
    image: "../images/faded.png",
  },
  {
    name: "Back Up Friend",
    artist: "FromTom",
    audio: "../music/Back-Up-Friend.mp3",
    image:
      "https://tribeofnoisestorage.blob.core.windows.net/images/73248/photo_1615875865.jpg",
  },
  {
    name: "Falling Down",
    artist: "Lil Peep",
    audio: "../music/fallingdown.mp3",
    image: "../images/fallingdown.jpg",
  },
  {
    name: "Stay",
    artist: "The Kid LAROI",
    audio: "../music/stay.mp3",
    image: "../images/stay.png",
  },
  {
    name: "Golden",
    artist: "NeonNiteClub",
    audio: "../music/golden.mp3",
    image: "https://prosearch.tribeofnoise.com/dist/images/artist-banner.jpg",
  },
];

let currentSongIndex = 0;
let audioElement;
let isPlaying = false;
let progressBar = document.getElementById("progress-bar");
let currentTimeEl = document.getElementById("current-time");
let totalDurationEl = document.getElementById("total-duration");
let playPauseBtn = document.getElementById("play-pause-btn");
let volumeSlider = document.getElementById("volume-slider");

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

const displaySong = () => {
  const song = songs[currentSongIndex];
  const musicCard = document.getElementById("music-card");

  musicCard.innerHTML = "";

  const img = document.createElement("img");
  img.src = song.image;
  img.alt = song.name;
  musicCard.appendChild(img);

  const songTitle = document.createElement("h3");
  songTitle.textContent = song.name;
  musicCard.appendChild(songTitle);

  const artistName = document.createElement("p");
  artistName.textContent = `Artist: ${song.artist}`;
  musicCard.appendChild(artistName);

  if (audioElement) {
    audioElement.pause();
    audioElement.src = song.audio;
  } else {
    audioElement = new Audio(song.audio);
  }
  audioElement.addEventListener("ended", playNextSong);

  audioElement.addEventListener("loadedmetadata", () => {
    totalDurationEl.textContent = formatTime(audioElement.duration);
    progressBar.max = audioElement.duration;
  });

  audioElement.addEventListener("timeupdate", () => {
    progressBar.value = audioElement.currentTime;
    currentTimeEl.textContent = formatTime(audioElement.currentTime);
  });
};

const togglePlayPause = () => {
  if (isPlaying) {
    audioElement.pause();
    playPauseBtn.querySelector("i").classList.remove("fa-pause");
    playPauseBtn.querySelector("i").classList.add("fa-play");
  } else {
    audioElement.play();
    playPauseBtn.querySelector("i").classList.remove("fa-play");
    playPauseBtn.querySelector("i").classList.add("fa-pause");
  }
  isPlaying = !isPlaying;
};

const playPrevSong = () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  displaySong();
  audioElement.play();
};

const playNextSong = () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  displaySong();
  audioElement.play();
};

const setVolume = () => {
  audioElement.volume = volumeSlider.value;
};

document
  .getElementById("play-pause-btn")
  .addEventListener("click", togglePlayPause);
document.getElementById("prev-btn").addEventListener("click", playPrevSong);
document.getElementById("next-btn").addEventListener("click", playNextSong);
volumeSlider.addEventListener("input", setVolume);
progressBar.addEventListener("input", () => {
  audioElement.currentTime = progressBar.value;
});

displaySong();
