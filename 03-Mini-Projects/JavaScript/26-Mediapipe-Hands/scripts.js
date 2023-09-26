// Source: https://github.com/google/mediapipe/blob/master/docs/solutions/hands.md

window.onload = () => {
  const videoSize = { width: 640, height: 320 };
  const cameraEl = document.getElementById("camera");
  const canvasCameraEl = document.getElementById("canvas--camera");
  const canvasCameraCtx = canvasCameraEl.getContext("2d");
  const imgPhotoEl = document.getElementById("photo");
  const canvasPhotoEl = document.getElementById("canvas--photo");
  const canvasPhotoCtx = canvasPhotoEl.getContext("2d");
  const videoEl = document.getElementById("video");
  const canvasVideoEl = document.getElementById("canvas--video");
  const canvasVideoCtx = canvasVideoEl.getContext("2d");

  function onResultsCamera(results) {
    if (!results.multiHandLandmarks) {
      canvasCameraCtx.clearRect(
        0,
        0,
        canvasCameraEl.width,
        canvasCameraEl.height
      );
      return;
    }

    cameraEl.width = window.innerWidth;
    cameraEl.height = window.innerHeight;
    canvasCameraEl.width = cameraEl.videoWidth;
    canvasCameraEl.height = cameraEl.videoHeight;

    canvasCameraCtx.save();
    canvasCameraCtx.clearRect(
      0,
      0,
      canvasCameraEl.width,
      canvasCameraEl.height
    );
    canvasCameraCtx.drawImage(
      results.image,
      0,
      0,
      canvasCameraEl.width,
      canvasCameraEl.height
    );

    // Only overwrite existing pixels.
    // canvasCameraCtx.globalCompositeOperation = "source-in";
    // canvasCameraCtx.fillStyle = "#00FF00";
    // canvasCameraCtx.fillRect(0, 0, canvasCameraEl.width, canvasCameraEl.height);

    // Only overwrite missing pixels.
    canvasCameraCtx.globalCompositeOperation = "destination-atop";
    canvasCameraCtx.drawImage(
      results.image,
      0,
      0,
      canvasCameraEl.width,
      canvasCameraEl.height
    );

    canvasCameraCtx.globalCompositeOperation = "source-over";
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCameraCtx, landmarks, HAND_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 5,
      });
      drawLandmarks(canvasCameraCtx, landmarks, {
        color: "#FF0000",
        lineWidth: 2,
      });
    }
    canvasCameraCtx.restore();
  }

  const modelHandsCamera = new Hands({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    },
  });
  modelHandsCamera.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
  modelHandsCamera.onResults(onResultsCamera);

  const camera = new Camera(cameraEl, {
    onFrame: async () => {
      await modelHandsCamera.send({ image: cameraEl });
    },
    width: videoSize.width,
    height: videoSize.height,
  });

  function onClickCameraStart() {
    camera.start();
  }

  //  Detect from Photo
  function onResultsPhoto(results) {
    if (!results.multiHandLandmarks) {
      canvasPhotoCtx.clearRect(0, 0, canvasPhotoEl.width, canvasPhotoEl.height);
      return;
    }

    imgPhotoEl.width = window.innerWidth;
    imgPhotoEl.height = window.innerHeight;
    canvasPhotoEl.width = imgPhotoEl.width;
    canvasPhotoEl.height = imgPhotoEl.height;

    canvasPhotoCtx.globalCompositeOperation = "source-over";
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasPhotoCtx, landmarks, HAND_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 5,
      });
      drawLandmarks(canvasPhotoCtx, landmarks, {
        color: "#FF0000",
        lineWidth: 2,
      });
    }
    canvasPhotoCtx.restore();
  }
  const modelHandsPhoto = new Hands({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    },
  });
  modelHandsPhoto.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
  modelHandsPhoto.onResults(onResultsPhoto);
  modelHandsPhoto.send({ image: imgPhotoEl });

  // Detect from Video
  function onResultsVideo(results) {
    if (!results.multiHandLandmarks) {
      canvasVideoCtx.clearRect(0, 0, canvasVideoEl.width, canvasVideoEl.height);
      return;
    }

    videoEl.width = window.innerWidth;
    videoEl.height = window.innerHeight;
    canvasVideoEl.width = videoEl.videoWidth;
    canvasVideoEl.height = videoEl.videoHeight;

    canvasVideoCtx.save();
    canvasVideoCtx.clearRect(0, 0, canvasVideoEl.width, canvasVideoEl.height);
    canvasVideoCtx.drawImage(
      results.image,
      0,
      0,
      canvasVideoEl.width,
      canvasVideoEl.height
    );

    // Only overwrite existing pixels.
    // canvasVideoCtx.globalCompositeOperation = "source-in";
    // canvasVideoCtx.fillStyle = "#00FF00";
    // canvasVideoCtx.fillRect(0, 0, canvasVideoEl.width, canvasVideoEl.height);

    // Only overwrite missing pixels.
    canvasVideoCtx.globalCompositeOperation = "destination-atop";
    canvasVideoCtx.drawImage(
      results.image,
      0,
      0,
      canvasVideoEl.width,
      canvasVideoEl.height
    );

    canvasVideoCtx.globalCompositeOperation = "source-over";
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasVideoCtx, landmarks, HAND_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 5,
      });
      drawLandmarks(canvasVideoCtx, landmarks, {
        color: "#FF0000",
        lineWidth: 2,
      });
    }
    canvasVideoCtx.restore();
  }

  const modelHandsVideo = new Hands({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    },
  });
  modelHandsVideo.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
  modelHandsVideo.onResults(onResultsVideo);

  async function onFrameVideo() {
    console.log("LOADEDDDDDDD");
    if (!videoEl.paused && !videoEl.ended) {
      await modelHandsVideo.send({
        image: videoEl,
      });
      // https://stackoverflow.com/questions/65144038/how-to-use-requestanimationframe-with-promise
      await new Promise(requestAnimationFrameVideo);
      onFrameVideo();
    } else {
      setTimeout(requestAnimationFrameVideo, 500);
    }
  }

  videoEl.onloadeddata = (evt) => {
    const video = evt.target;

    canvasVideoEl.width = video.videoWidth;
    canvasVideoEl.height = video.videoHeight;

    if (modelHandsVideo) {
      videoEl.play();
      onFrameVideo();
    }
  };
};
