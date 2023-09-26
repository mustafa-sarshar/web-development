import vision from "https://cdn.skypack.dev/@mediapipe/tasks-vision@latest";

window.onload = () => {
  const { HandLandmarker, FilesetResolver } = vision;

  const videoEl = document.getElementById("video");
  const canvasEl = document.getElementById("canvas");
  const context2D = canvasEl.getContext("2d");
  const btnTogglePredictingEl = document.getElementById("btnToggle");
  const constraints = {
    audio: false,
    video: true,
  };
  const videoHeight = "360px";
  const videoWidth = "480px";
  let handLandmarker = undefined;
  let runningMode = "IMAGE";
  let webcamRunning = false;

  btnTogglePredictingEl.addEventListener("click", () => {
    webcamRunning = !webcamRunning;

    if (webcamRunning) {
      predictWebcam();
    }
  });

  async function runDemo() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-assets/hand_landmarker.task",
      },
      runningMode: runningMode,
      numHands: 2,
    });

    console.log("Model Loaded", vision, handLandmarker);
  }

  function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  async function predictWebcam() {
    canvasEl.style.height = videoHeight;
    videoEl.style.height = videoHeight;
    canvasEl.style.width = videoWidth;
    videoEl.style.width = videoWidth;
    // Now let's start detecting the stream.

    if (runningMode === "IMAGE") {
      runningMode = "VIDEO";
      await handLandmarker.setOptions({ runningMode: runningMode });
    }

    let nowInMs = Date.now();
    const results = handLandmarker.detectForVideo(videoEl, nowInMs);

    context2D.save();
    context2D.clearRect(0, 0, canvasEl.width, canvasEl.height);
    if (results.landmarks) {
      for (const landmarks of results.landmarks) {
        drawConnectors(context2D, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        drawLandmarks(context2D, landmarks, { color: "#FF0000", lineWidth: 2 });
      }
    }
    context2D.restore();

    // Call this function again to keep predicting when the browser is ready.
    if (handLandmarker && webcamRunning) {
      window.requestAnimationFrame(predictWebcam);
    }
  }

  runDemo();
  // Attach the video stream to the video element and autoplay.
  if (hasGetUserMedia()) {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoEl.srcObject = stream;
        videoEl.addEventListener("loadeddata", predictWebcam);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
