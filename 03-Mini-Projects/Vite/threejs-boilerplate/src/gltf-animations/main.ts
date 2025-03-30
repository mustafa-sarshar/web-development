// Get animations from mixamo -> https://www.mixamo.com/

import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Stats from "three/addons/libs/stats.module.js";

const modelUrl = {
  MODEL_EVE: {
    MODEL_IDLE: "models/gltf-animations/eve__with-skin__idle.glb",
    MODEL_WALKING: "models/gltf-animations/eve__no-skin__walking.glb",
    MODEL_RUNNING: "models/gltf-animations/eve__no-skin__running.glb",
  },
  MODEL_WARROCK_KURNIAWAN: {
    MODEL_IDLE: "models/gltf-animations/warrock-w-kurniawan__with-skin__idle.glb",
    MODEL_WALKING: "models/gltf-animations/warrock-w-kurniawan__with-skin__walking.glb",
    MODEL_RUNNING: "models/gltf-animations/warrock-w-kurniawan__with-skin__running.glb",
  },
};

const scene = new THREE.Scene();

const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);

new RGBELoader().load("img/venice_sunset_1k.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  scene.background = texture;
  scene.backgroundBlurriness = 1;
});

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(2, 2.5, 2.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0.75, 0);

const stats = new Stats();
document.body.appendChild(stats.dom);

function lerp(from: number, to: number, speed: number) {
  const amount = (1 - speed) * from + speed * to;
  return Math.abs(from - to) < 0.001 ? to : amount;
}

let mixer: THREE.AnimationMixer;
let animationActions: { [key: string]: THREE.AnimationAction } = {};
let activeAction: THREE.AnimationAction;
let speed = 0;
let toSpeed = 0;

/* 
new GLTFLoader().load(modelUrl.MODEL_EVE.MODEL_IDLE, (gltf: GLTF) => {
  mixer = new THREE.AnimationMixer(gltf.scene);
  console.log(gltf);

  mixer.clipAction(gltf.animations[0]).play();

  scene.add(gltf.scene);
}); 
*/

async function loadEve() {
  const loader = new GLTFLoader();
  const [model_idle, model_walking, model_running] = await Promise.all([
    loader.loadAsync(modelUrl.MODEL_WARROCK_KURNIAWAN.MODEL_IDLE),
    loader.loadAsync(modelUrl.MODEL_WARROCK_KURNIAWAN.MODEL_WALKING),
    loader.loadAsync(modelUrl.MODEL_WARROCK_KURNIAWAN.MODEL_RUNNING),
  ]);

  mixer = new THREE.AnimationMixer(model_idle.scene);

  // mixer.clipAction(model_idle.animations[0]).play();

  animationActions["idle"] = mixer.clipAction(model_idle.animations[0]);
  animationActions["walk"] = mixer.clipAction(model_walking.animations[0]);
  animationActions["run"] = mixer.clipAction(model_running.animations[0]);

  animationActions["idle"].play();
  activeAction = animationActions["idle"];

  scene.add(model_idle.scene);
}
await loadEve();

const keyMap: { [key: string]: boolean } = {};

const onDocumentKey = (e: KeyboardEvent) => {
  keyMap[e.code] = e.type === "keydown";
};
document.addEventListener("keydown", onDocumentKey, false);
document.addEventListener("keyup", onDocumentKey, false);

const clock = new THREE.Clock();
let delta = 0;

function animate() {
  requestAnimationFrame(animate);

  delta = clock.getDelta();

  controls.update();

  mixer && mixer.update(delta);

  if (keyMap["KeyW"]) {
    if (keyMap["ShiftLeft"]) {
      //run
      if (activeAction != animationActions["run"]) {
        activeAction.fadeOut(0.5);
        animationActions["run"].reset().fadeIn(0.25).play();
        activeAction = animationActions["run"];
        toSpeed = 4;
      }
    } else {
      //walk
      if (activeAction != animationActions["walk"]) {
        activeAction.fadeOut(0.5);
        animationActions["walk"].reset().fadeIn(0.25).play();
        activeAction = animationActions["walk"];
        toSpeed = 1;
      }
    }
  } else {
    //idle
    if (activeAction != animationActions["idle"]) {
      activeAction.fadeOut(0.5);
      animationActions["idle"].reset().fadeIn(0.25).play();
      activeAction = animationActions["idle"];
      toSpeed = 0;
    }
  }

  speed = lerp(speed, toSpeed, delta * 10);
  gridHelper.position.z -= speed * delta;
  gridHelper.position.z = gridHelper.position.z % 10;

  renderer.render(scene, camera);

  stats.update();
}

animate();
