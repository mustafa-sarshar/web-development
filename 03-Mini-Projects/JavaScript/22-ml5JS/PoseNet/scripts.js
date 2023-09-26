const videoEl = document.getElementById("video");
const canvasEl = document.getElementById("canvas");
const btnTogglePoseNetEl = document.getElementById("btnTogglePoseNet");
let canvasContext;
let poseNetGetDataFlag = false;

// Create a new poseNet method
const poseNetOptions = {
  architecture: "MobileNetV1",
  imageScaleFactor: 0.3,
  outputStride: 16,
  flipHorizontal: false,
  minConfidence: 0.5,
  maxPoseDetections: 5,
  scoreThreshold: 0.5,
  nmsRadius: 20,
  detectionType: "multiple",
  inputResolution: 513,
  multiplier: 0.75,
  quantBytes: 2,
};
const poseNet = ml5.poseNet(videoEl, poseNetOptions, onLoadModel);

// When the model is loaded
function onLoadModel() {
  console.log("Model Loaded!");
}

// Listen to new 'pose' events
poseNet.on("pose", (results) => {
  if (poseNetGetDataFlag) {
    runPoseEstimation(results);
  }
});

// Promise.all([onLoadModel()]).then(startVideo);
btnTogglePoseNetEl.addEventListener("click", (_) => {
  poseNetGetDataFlag = !poseNetGetDataFlag;
  if (poseNetGetDataFlag) {
    btnTogglePoseNetEl.classList.add("button-stop");
    btnTogglePoseNetEl.classList.remove("button-start");
    btnTogglePoseNetEl.textContent = "Stop PoseNet";
  } else {
    btnTogglePoseNetEl.classList.add("button-start");
    btnTogglePoseNetEl.classList.remove("button-stop");
    btnTogglePoseNetEl.textContent = "Star PoseNet";
  }
  console.log("PoseNet getting data:", poseNetGetDataFlag);
});

function runPoseEstimation(poses) {
  if (videoEl.paused || videoEl.ended) {
    return;
  }
  estimatePose(poses);
}

function estimatePose(poses) {
  getPoseData(poses);
}

function getPoseData(poses) {
  poses.forEach((poseData) => {
    if (poseData.skeleton.length > 0) {
      const pose = poseData.pose;
      if (pose.keypoints) {
        getPoseKeyPointData(pose.keypoints);
      }
    }
  });
}

function getPoseKeyPointData(keyPoints) {
  keyPoints.forEach((keyPoint) => {
    console.log(keyPoint);
    drawKeyPointOnFrame(keyPoint.position);
  });
}

function drawKeyPointOnFrame({ x, y }) {
  roundedRect(canvasContext, x, y, 10, 10, 10);
}

function addEffectsToFrame() {
  canvasContext.drawImage(
    videoEl,
    0,
    0,
    videoEl.videoWidth,
    videoEl.videoHeight
  );
  const frame = canvasContext.getImageData(
    0,
    0,
    videoEl.videoWidth,
    videoEl.videoHeight
  );
  let data = frame.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i + 0];
    const green = data[i + 1];
    const blue = data[i + 2];
    if (green > 100 && red > 100 && blue > 43) {
      data[i + 3] = 0;
    }
  }
  canvasContext.putImageData(frame, 0, 0);
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.stroke();
}

// Handle the camera and the video
function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (videoEl.srcObject = stream),
    (err) => console.error(err)
  );
}

videoEl.addEventListener(
  "play",
  (evt) => {
    console.log("Video Played", evt);
  },
  false
);

window.onload = async () => {
  canvasContext = await canvasEl.getContext("2d");
  startVideo();
};
