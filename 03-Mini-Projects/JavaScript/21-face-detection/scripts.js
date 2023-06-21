const videoEl = document.getElementById("video");
const btnFlipHorizontallyEl = document.getElementById("btnFlipHorizontally");

Promise.all([
  // faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  // faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  // faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  // faceapi.nets.faceExpressionNet.loadFromUri("/models"),
]).then(startVideo);

if (videoEl.requestFullscreen) {
  videoEl.requestFullscreen();
  console.log("Fullscreen")
} else if (videoEl.mozRequestFullScreen) {
  videoEl.mozRequestFullScreen();
} else if (videoEl.webkitRequestFullscreen) {
  videoEl.webkitRequestFullscreen();
} else if (videoEl.msRequestFullscreen) {
  videoEl.msRequestFullscreen();
}

function startVideo() {
  navigator.getUserMedia(
    { video: true, width: 1280, height: 720 },
    (stream) => (videoEl.srcObject = stream),
    (err) => console.error(err)
  );
}

videoEl.addEventListener("play", () => {
  console.log("Video Played");
});

btnFlipHorizontallyEl.addEventListener("click", () => {
  console.log("Flip Video!");
  videoEl.classList.toggle("flip");
});
