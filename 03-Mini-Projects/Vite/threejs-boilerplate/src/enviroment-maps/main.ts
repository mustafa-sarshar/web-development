import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const scene = new THREE.Scene();

/* const environmentTexture = new THREE.CubeTextureLoader()
  .setPath("https://sbcode.net/img/")
  .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);
scene.environment = environmentTexture;
scene.background = environmentTexture; */

// const hdr = "https://sbcode.net/img/rustig_koppie_puresky_1k.hdr";
// const hdr = 'https://sbcode.net/img/venice_sunset_1k.hdr'
const hdr = 'https://sbcode.net/img/spruit_sunrise_1k.hdr'

let environmentTexture: THREE.DataTexture;

new RGBELoader().load(hdr, (texture) => {
  environmentTexture = texture;
  environmentTexture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = environmentTexture;
  scene.background = environmentTexture;
  scene.environmentIntensity = 1; // added in Three r163
});

const directionalLight = new THREE.DirectionalLight(0xebfeff, Math.PI);
directionalLight.position.set(1, 0.1, 1);
directionalLight.visible = false;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xebfeff, Math.PI / 16);
ambientLight.visible = false;
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(-2, 0.5, 2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const texture = new THREE.TextureLoader().load(
  "https://sbcode.net/img/grid.png"
);
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshPhysicalMaterial();
material.side = THREE.DoubleSide;
// material.envMapIntensity = 0.7
// material.roughness = 0.17
// material.metalness = 0.07
// material.clearcoat = 0.43
// material.iridescence = 1
// material.transmission = 1
// material.thickness = 5.12
// material.ior = 1.78

const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), material);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
plane.visible = false;
scene.add(plane);

new GLTFLoader().load(
  "https://sbcode.net/models/suzanne_no_material.glb",
  (gltf) => {
    gltf.scene.traverse((child) => {
      (child as THREE.Mesh).material = material;
    });
    scene.add(gltf.scene);
  }
);

const data = {
  environment: true,
  background: true,
  mapEnabled: false,
  planeVisible: false,
};

const gui = new GUI();

gui.add(data, "environment").onChange(() => {
  if (data.environment) {
    scene.environment = environmentTexture;
    directionalLight.visible = false;
    ambientLight.visible = false;
  } else {
    scene.environment = null;
    directionalLight.visible = true;
    ambientLight.visible = true;
  }
});

gui.add(scene, "environmentIntensity", 0, 2, 0.01); // new in Three r163. Can be used instead of `renderer.toneMapping` with `renderer.toneMappingExposure`

gui.add(renderer, "toneMappingExposure", 0, 2, 0.01);

gui.add(data, "background").onChange(() => {
  if (data.background) {
    scene.background = environmentTexture;
  } else {
    scene.background = null;
  }
});

gui.add(scene, "backgroundBlurriness", 0, 1, 0.01);

gui.add(data, "mapEnabled").onChange(() => {
  if (data.mapEnabled) {
    material.map = texture;
  } else {
    material.map = null;
  }
  material.needsUpdate = true;
});

gui.add(data, "planeVisible").onChange((v) => {
  plane.visible = v;
});

const materialFolder = gui.addFolder("meshPhysicalMaterial");
materialFolder.add(material, "envMapIntensity", 0, 1.0, 0.01).onChange(() => {
  // Since r163, `envMap` is no longer copied from `scene.environment`. You will need to manually copy it, if you want to modify `envMapIntensity`
  if (!material.envMap) {
    material.envMap = scene.environment;
  }
}); // from meshStandardMaterial
materialFolder.add(material, "roughness", 0, 1.0, 0.01); // from meshStandardMaterial
materialFolder.add(material, "metalness", 0, 1.0, 0.01); // from meshStandardMaterial
materialFolder.add(material, "clearcoat", 0, 1.0, 0.01);
materialFolder.add(material, "iridescence", 0, 1.0, 0.01);
materialFolder.add(material, "transmission", 0, 1.0, 0.01);
materialFolder.add(material, "thickness", 0, 10.0, 0.01);
materialFolder.add(material, "ior", 1.0, 2.333, 0.01);
materialFolder.close();

const stats = new Stats();
document.body.appendChild(stats.dom);

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);

  stats.update();
}

animate();
