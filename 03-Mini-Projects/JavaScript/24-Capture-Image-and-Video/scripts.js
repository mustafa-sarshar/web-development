// Source: https://web.dev/media-capturing-images/ (accessed on 26.03.2023)
"use strict";

const supported = "mediaDevices" in navigator;
console.log(navigator);
const fileInputEl = document.getElementById("file-input");
const fileInputCaptureEl = document.getElementById("file-input-capture");
const fileInputCaptureUserEl = document.getElementById(
  "file-input-capture-user"
);
const fileInputCaptureEnvironmentEl = document.getElementById(
  "file-input-capture-environment"
);
const dropTargetEl = document.getElementById("drop-target");
const clipboardTargetEl = document.getElementById("clipboard-target");
const imageOutputEl = document.getElementById("image-output");
const videoPlayerEl = document.getElementById("video-player");
const btnCaptureCameraEl = document.getElementById("btn-capture-camera");
const btnToggleCameraEl = document.getElementById("btn-toggle-camera");
const canvasCaptureCameraEl = document.getElementById("canvas-capture-camera");
const contextCamera = canvasCaptureCameraEl.getContext("2d");

/* ************************ Get Image from User ************************ */
fileInputEl.addEventListener("change", (e) => handleLoadFile(e.target.files));

fileInputCaptureEl.addEventListener("change", (e) =>
  handleLoadFile(e.target.files)
);

fileInputCaptureUserEl.addEventListener("change", (e) =>
  handleLoadFile(e.target.files)
);

fileInputCaptureEnvironmentEl.addEventListener("change", (e) =>
  handleLoadFile(e.target.files)
);

dropTargetEl.addEventListener("drop", (e) => {
  e.stopPropagation();
  e.preventDefault();

  handleLoadFile(e.dataTransfer.files);
});

dropTargetEl.addEventListener("dragover", (e) => {
  e.stopPropagation();
  e.preventDefault();

  e.dataTransfer.dropEffect = "copy";
});

clipboardTargetEl.addEventListener("paste", (e) => {
  e.preventDefault();

  const files = e.clipboardData.files;
  if (files.length > 0) {
    e.target.textContent += "\nFiles loaded:\n";
    for (let i = 0; i < files.length; i++) {
      e.target.textContent += files[i].name + "\n";
    }
  }

  handleLoadFile(files);
});

function handleLoadFile(fileList) {
  let file = null;
  for (let i = 0; i < fileList.length; i++) {
    if (fileList[i].type.match(/^image\//)) {
      file = fileList[i];
      break;
    }
  }

  if (file !== null) {
    imageOutputEl.src = URL.createObjectURL(file);
  }

  console.log("Files Loaded:\n", fileList);
}

/* ************************ Capture Camera ************************ */
const constraints = {
  video: true,
};

// Attach the video stream to the video element and autoplay.
navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  videoPlayerEl.srcObject = stream;
});

btnCaptureCameraEl.addEventListener("click", () => {
  // Draw the video frame to the canvas.
  contextCamera.drawImage(
    videoPlayerEl,
    0,
    0,
    canvasCaptureCameraEl.width,
    canvasCaptureCameraEl.height
  );
});

btnToggleCameraEl.addEventListener("click", () => {
  videoPlayerEl.srcObject.getVideoTracks().forEach((track) => {
    if (track.readyState === "live") {
      console.log(track);

      track.stop();
    } else {
      console.log(track);
    }
  });
});
