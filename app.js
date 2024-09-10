// import lottiWeb from "https://cdn.skypack.dev/lottie-web";

// const playIconContainer = document.getElementById("play-icon");
// const audioPlayerContainer = document.getElementById("audio-player-container");
// const seekSlider = document.getElementById("seek-slide");
// const volumeSlider = document.getElementById("volume-slider");
// const muteIconContainer = document.getElementById("mute-icon");

// let muteState = "unmute";
// let playState = "play";

// //playAnimation
// const animation = lottiWeb.loadAnimation({
//   container: playIconContainer,
//   path: "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json",
//   renderer: "svg",
//   loop: false,
//   autoplay: false,
//   name: "Demo Animation",
// });

// const muteAnimation = lottiWeb.loadAnimation({
//   container: muteIconContainer,
//   path: "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json",
//   renderer: "svg",
//   loop: false,
//   autoplay: false,
//   name: "Mute Animation",
// });

// animation.goToAndStop(14, true);

// playIconContainer.addEventListener("click", () => {
//   if (playState === "play") {
//     animation.playSegments([14, 27], true);
//     playState = "pause";
//   } else {
//     animation.playSegments([0, 14], true);
//     playState = "play";
//   }
// });

// muteIconContainer.addEventListener("click", () => {
//   if (muteState === "unmute") {
//     muteAnimation.playSegments([0, 15], true);
//     muteState = "mute";
//   } else {
//     muteAnimation.playSegments([15, 25], true);
//     muteState = "unmute";
//   }
// });

// const showRangeProgress = (rangeInput) => {
//   if (rangeInput === seekSlider) {
//     audioPlayerContainer.style.setProperty(
//       "--seek-before-width",
//       (rangeInput.value / rangeInput.max) * 100 + "%"
//     );
//   } else {
//     audioPlayerContainer.style.setProperty(
//       "--volume-before-width",
//       (rangeInput.value / rangeInput.max) * 100 + "%"
//     );
//   }
// };

// seekSlider.addEventListener("input", (e) => {
//   showRangeProgress(e.target);
// });
// volumeSlider.addEventListener("input", (e) => {
//   showRangeProgress(e.target);
// });

// /** Implementation of the functionality of the audio player */

// const audio = document.querySelector("audio");
// const durationContainer = document.getElementById("duration");

// const calculateTime = (secs) => {
//   const minutes = Math.floor(secs / 60);
//   const seconds = Math.floor(secs % 60);
//   const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
//   return `${minutes}:${returnedSeconds}`;
// };

// const displayDuration = () => {
//   durationContainer.textContent = calculateTime(audio.duration);
// };

// const setSliderMax = () => {
//   seekSlider.max = Math.floor(audio.duration);
// };

// const displayBufferedAmount = () => {
//   const bufferedAmount = Math.floor(
//     audio.buffered.end(audio.buffered.length - 1)
//   );
//   audioPlayerContainer.style.setProperty(
//     "--buffered-width",
//     `${(bufferedAmount / seekSlider.max) * 100}%`
//   );
// };

// if (audio.readyState > 0) {
//   displayDuration();
//   setSliderMax();
//   displayBufferedAmount();
// } else {
//   audio.addEventListener("loadedmetadata", () => {
//     displayDuration();
//     setSliderMax();
//     displayBufferedAmount();
//   });
// }

// audio.addEventListener("progress", displayBufferedAmount);

// //TO CAPTURE THE CURRENT TIME VALUE.

// const currentTimeContainer = document.getElementById("current-time");

// seekSlider.addEventListener("input", () => {
//   currentTimeContainer.textContent = calculateTime(seekSlider.value);
// });

// playIconContainer.addEventListener("click", () => {
//   if (playState === "play") {
//     audio.play();
//     animation.playSegments([14, 27], true);
//     playState = "pause";
//   } else {
//     audio.pause();
//     animation.playSegments([0, 4], true);
//     playState = "play";
//   }
// });

// //If the user wants to seek to a specific point in the song

// seekSlider.addEventListener("change", () => {
//   audio.currentTime = seekSlider.value;
// });

// // Update the seek as the song plays/

// audio.addEventListener("timeupdate", () => {
//   seekSlider.value = Math.floor(audio.currentTime);
// });

/** Implementation of the presentation of the audio player */
import lottieWeb from "https://cdn.skypack.dev/lottie-web";

const playIconContainer = document.getElementById("play-icon");
const audioPlayerContainer = document.getElementById("audio-player-container");
const seekSlider = document.getElementById("seek-slide");
const volumeSlider = document.getElementById("volume-slider");
const muteIconContainer = document.getElementById("mute-icon");
let playState = "play";
let muteState = "unmute";

const playAnimation = lottieWeb.loadAnimation({
  container: playIconContainer,
  path: "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json",
  renderer: "svg",
  loop: false,
  autoplay: false,
  name: "Play Animation",
});

const muteAnimation = lottieWeb.loadAnimation({
  container: muteIconContainer,
  path: "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json",
  renderer: "svg",
  loop: false,
  autoplay: false,
  name: "Mute Animation",
});

playAnimation.goToAndStop(14, true);

playIconContainer.addEventListener("click", () => {
  if (playState === "play") {
    audio.play();
    playAnimation.playSegments([14, 27], true);
    requestAnimationFrame(whilePlaying);
    playState = "pause";
  } else {
    audio.pause();
    playAnimation.playSegments([0, 14], true);
    cancelAnimationFrame(raf);
    playState = "play";
  }
});

muteIconContainer.addEventListener("click", () => {
  if (muteState === "unmute") {
    muteAnimation.playSegments([0, 15], true);
    muteState = "mute";
  } else {
    muteAnimation.playSegments([15, 25], true);
    muteState = "unmute";
  }
});

const showRangeProgress = (rangeInput) => {
  if (rangeInput === seekSlider)
    audioPlayerContainer.style.setProperty(
      "--seek-before-width",
      (rangeInput.value / rangeInput.max) * 100 + "%"
    );
  else
    audioPlayerContainer.style.setProperty(
      "--volume-before-width",
      (rangeInput.value / rangeInput.max) * 100 + "%"
    );
};

seekSlider.addEventListener("input", (e) => {
  showRangeProgress(e.target);
});
volumeSlider.addEventListener("input", (e) => {
  showRangeProgress(e.target);
});

/** Implementation of the functionality of the audio player */

const audio = document.querySelector("audio");
const durationContainer = document.getElementById("duration");
const currentTimeContainer = document.getElementById("current-time");
let raf = null;

const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};

const displayDuration = () => {
  durationContainer.textContent = calculateTime(audio.duration);
};

const setSliderMax = () => {
  seekSlider.max = Math.floor(audio.duration);
};

const displayBufferedAmount = () => {
  const bufferedAmount = Math.floor(
    audio.buffered.end(audio.buffered.length - 1)
  );
  audioPlayerContainer.style.setProperty(
    "--buffered-width",
    `${(bufferedAmount / seekSlider.max) * 100}%`
  );
};

const whilePlaying = () => {
  seekSlider.value = Math.floor(audio.currentTime);
  currentTimeContainer.textContent = calculateTime(seekSlider.value);
  audioPlayerContainer.style.setProperty(
    "--seek-before-width",
    `${(seekSlider.value / seekSlider.max) * 100}%`
  );
  raf = requestAnimationFrame(whilePlaying);
};

if (audio.readyState > 0) {
  displayDuration();
  setSliderMax();
  displayBufferedAmount();
} else {
  audio.addEventListener("loadedmetadata", () => {
    displayDuration();
    setSliderMax();
    displayBufferedAmount();
  });
}

audio.addEventListener("progress", displayBufferedAmount);

seekSlider.addEventListener("input", () => {
  currentTimeContainer.textContent = calculateTime(seekSlider.value);
  if (!audio.paused) {
    cancelAnimationFrame(raf);
  }
});

seekSlider.addEventListener("change", () => {
  audio.currentTime = seekSlider.value;
  if (!audio.paused) {
    requestAnimationFrame(whilePlaying);
  }
});
