import vision from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
const { FaceLandmarker, FilesetResolver, DrawingUtils } = vision;

window.onload = () => {
  console.log("Loaded!", vision);

  async function createFaceLandmarker() {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    );
    const faceLandmarker = await FaceLandmarker.createFromOptions(
      filesetResolver,
      {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: "GPU",
        },
        outputFaceBlendshapes: true,
        runningMode,
        numFaces: 1,
      }
    );

    return faceLandmarker;
  }

  async function detectLandmarks() {
    const runningMode = "IMAGE";
    const faceLandmarker = createFaceLandmarker();
    await faceLandmarker.setOptions({ runningMode });
  }
};
