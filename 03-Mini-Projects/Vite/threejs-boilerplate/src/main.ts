import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "dat.gui";
// import { GUI } from "three/addons/libs/lil-gui.module.min.js";

// Add Scene objects ----------------------------------------------------------------------------

const sceneA = new THREE.Scene();
sceneA.background = new THREE.Color(0x070921);
sceneA.add(new THREE.GridHelper(10));
sceneA.add(new THREE.AxesHelper(5));

const sceneB = new THREE.Scene();
sceneB.background = new THREE.TextureLoader().load(
  "https://sbcode.net/img/grid.png"
);

const sceneC = new THREE.Scene();
sceneC.background = new THREE.CubeTextureLoader()
  .setPath("https://sbcode.net/img/")
  .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);
// sceneC.backgroundBlurriness = 0.1;

const sceneD = new THREE.Scene();
sceneD.background = new THREE.Color(0x070921);
sceneD.add(new THREE.GridHelper(50));
sceneD.add(new THREE.AxesHelper(5));

const sceneSettings = {
  scenes: {
    "Scene A": sceneA,
    "Scene B": sceneB,
    "Scene C": sceneC,
    "Scene D": sceneD,
  },
  activeScene: sceneD,
};

// Add Camera object ----------------------------------------------------------------------------
const cameraSettings = {
  fov: 75,
  aspect: window.innerWidth / window.innerHeight,
  near: 0.1,
  far: 1000,
  posX: 0,
  posY: 4,
  posZ: 5,
  lookAtX: 0,
  lookAtY: 0.5,
  lookAtZ: 0,
  isLookAt: false,
  applySettings: false,
};

const camera = new THREE.PerspectiveCamera(
  cameraSettings.fov,
  cameraSettings.aspect,
  cameraSettings.near,
  cameraSettings.far
);
camera.position.set(
  cameraSettings.posX,
  cameraSettings.posY,
  cameraSettings.posZ
);
camera.lookAt(
  cameraSettings.lookAtX,
  cameraSettings.lookAtY,
  cameraSettings.lookAtZ
);

// Add the 3D Renderer ----------------------------------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add orbit controls for camera
const controls = new OrbitControls(camera, renderer.domElement);

// Add Light to the scene
const light = new THREE.PointLight(0xffffff, 400);
light.position.set(10, 10, 10);
sceneD.add(light);

// Add Debugger
const debug = document.getElementById("debug") as HTMLDivElement;

// Add Objects
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshNormalMaterial({ wireframe: true })
);
cube.position.y = 1.5;
sceneA.add(cube);

// Add Object via Hierarchy
const ball1 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);
ball1.position.set(-6, 0, 0);
sceneD.add(ball1);
ball1.add(new THREE.AxesHelper(5));

const ball2 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhongMaterial({ color: 0x00ff00 })
);
ball2.position.set(4, 0, 0);
ball1.add(ball2);
ball2.add(new THREE.AxesHelper(5));

const ball3 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhongMaterial({ color: 0x0000ff })
);
ball3.position.set(4, 0, 0);
ball2.add(ball3);
ball3.add(new THREE.AxesHelper(5));

// Add Stats of the monitor
const stats = new Stats();
document.body.appendChild(stats.dom);

// Add Dat GUI
const gui = new GUI();

// Dat GUI for Scene settings --------------------------------------------------------------------------
const guiFolderScenes = gui.addFolder("Scenes");

// guiFolderScenes
//   .add(sceneSettings, "scenes", sceneSettings.scenes)
//   .name("Activate Scene")
//   .listen()
//   .onChange((sceneVal: THREE.Scene) => {
//     console.log(sceneVal.id);
//     sceneSettings.activeScene = sceneVal;
//   });

guiFolderScenes
  .add(sceneSettings, "activeScene", [
    "Scene A",
    "Scene B",
    "Scene C",
    "Scene D",
  ])
  .name("Active Scene")
  .listen()
  .onChange((newVal: string) => {
    switch (newVal) {
      case "Scene A":
        sceneSettings.activeScene = sceneA;
        break;
      case "Scene B":
        sceneSettings.activeScene = sceneB;
        break;
      case "Scene C":
        sceneSettings.activeScene = sceneC;
        break;
      case "Scene D":
        sceneSettings.activeScene = sceneD;

        controls.target.set(8, 0, 0);
        controls.update();
        cameraSettings.posX = 0;
        cameraSettings.posY = 4;
        cameraSettings.posZ = 5;
        cameraSettings.fov = 120;

        updateCamera();

        break;
      default:
        break;
    }
  });

const guiFolderCube = gui.addFolder("Cube");
const guiFolderCubeRotation = guiFolderCube.addFolder("Rotation");
guiFolderCubeRotation.add(cube.rotation, "x", 0, Math.PI * 2);
guiFolderCubeRotation.add(cube.rotation, "y", 0, Math.PI * 2);
guiFolderCubeRotation.add(cube.rotation, "z", 0, Math.PI * 2);
// guiFolderCube.open();

// Dat GUI for Camera settings --------------------------------------------------------------------------
const guiFolderCamera = gui.addFolder("Camera");

const guiFolderCameraInits = guiFolderCamera.addFolder("Inits");
// Dat GUI for Camera settings --> Camera FOV
guiFolderCameraInits
  .add(cameraSettings, "fov", 0, 180, 0.01)
  .name("FOV")
  .listen()
  .onChange((newVal: number) => {
    cameraSettings.fov = newVal;
  });
// Dat GUI for Camera settings --> Camera Aspect
guiFolderCameraInits
  .add(cameraSettings, "aspect", 0.00001, 10)
  .name("Aspect")
  .listen()
  .onChange((newVal: number) => {
    cameraSettings.aspect = newVal;
  });
// Dat GUI for Camera settings --> Camera Near
guiFolderCameraInits
  .add(cameraSettings, "near", 0.01, 10)
  .name("Near")
  .listen()
  .onChange((newVal: number) => {
    cameraSettings.near = newVal;
  });
// Dat GUI for Camera settings --> Camera Far
guiFolderCameraInits
  .add(cameraSettings, "far", 0.01, 10)
  .name("Far")
  .listen()
  .onChange((newVal: number) => {
    cameraSettings.far = newVal;
  });
// Dat GUI for Camera settings --> isLookAt
guiFolderCameraInits
  .add(cameraSettings, "isLookAt", cameraSettings.isLookAt)
  .name("Activate LookAt")
  .listen()
  .onChange((newVal: boolean) => {
    cameraSettings.isLookAt = newVal;
  });

// Dat GUI for Camera settings --> Camera Position
const guiFolderCameraPosition = guiFolderCamera.addFolder("Position");
guiFolderCameraPosition
  .add(cameraSettings, "posX", -10, 10)
  .name("Position X")
  .listen()
  .onChange((newVal: number) => {
    cameraSettings.posX = newVal;
  });
guiFolderCameraPosition
  .add(cameraSettings, "posY", -10, 10)
  .name("Position Y")
  .listen()
  .onChange((newVal: number) => {
    cameraSettings.posY = newVal;
  });
guiFolderCameraPosition
  .add(cameraSettings, "posZ", -10, 10)
  .name("Position Z")
  .listen()
  .onChange((newVal: number) => {
    cameraSettings.posZ = newVal;
  });

// Dat GUI for Camera settings --> Apply Settings
guiFolderCamera
  .add(cameraSettings, "applySettings", cameraSettings.applySettings)
  .name("Apply Settings")
  .listen()
  .onChange((newVal: boolean) => {
    cameraSettings.applySettings = newVal;
  });
// guiFolderCamera.open();

function updateCamera() {
  camera.position.set(
    cameraSettings.posX,
    cameraSettings.posY,
    cameraSettings.posZ
  );
  camera.fov = cameraSettings.fov;
  camera.aspect = cameraSettings.aspect;
  camera.near = cameraSettings.near;
  camera.far = cameraSettings.far;

  if (cameraSettings.isLookAt) {
    camera.lookAt(
      cameraSettings.lookAtX,
      cameraSettings.lookAtY,
      cameraSettings.lookAtZ
    );
  }
  camera.updateProjectionMatrix();
}

const ball1Folder = gui.addFolder("Ball1 (Red Ball)");
ball1Folder.add(ball1.position, "x", -10, 10, 0.01).name("X Position");
ball1Folder.add(ball1.rotation, "x", 0, Math.PI * 2, 0.01).name("X Rotation");
ball1Folder.add(ball1.scale, "x", 0, 2, 0.01).name("X Scale");
ball1Folder.add(ball1, "visible", 0, 2, 0.01).name("Visible");
ball1Folder.open();
const ball2Folder = gui.addFolder("Ball2 (Green Ball)");
ball2Folder.add(ball2.position, "x", -10, 10, 0.01).name("X Position");
ball2Folder.add(ball2.rotation, "x", 0, Math.PI * 2, 0.01).name("X Rotation");
ball2Folder.add(ball2.scale, "x", 0, 2, 0.01).name("X Scale");
ball2Folder.add(ball2, "visible", 0, 2, 0.01).name("Visible");
ball2Folder.open();
const ball3Folder = gui.addFolder("Ball3 (Blue Ball)");
ball3Folder.add(ball3.position, "x", -10, 10, 0.01).name("X Position");
ball3Folder.add(ball3.rotation, "x", 0, Math.PI * 2, 0.01).name("X Rotation");
ball3Folder.add(ball3.scale, "x", 0, 2, 0.01).name("X Scale");
ball3Folder.add(ball3, "visible", 0, 2, 0.01).name("Visible");
ball3Folder.open();

// Clock ---------------------------------------------------------------------------------------
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  // stats.begin();
  cube.rotation.x += delta;
  cube.rotation.y += delta;
  // stats.end();

  // Update Camera
  if (cameraSettings.applySettings) {
    updateCamera();
  }

  renderer.render(sceneSettings.activeScene, camera);

  const ball1WorldPosition = new THREE.Vector3();
  ball1.getWorldPosition(ball1WorldPosition);
  const ball2WorldPosition = new THREE.Vector3();
  ball2.getWorldPosition(ball2WorldPosition);
  const ball3WorldPosition = new THREE.Vector3();
  ball3.getWorldPosition(ball3WorldPosition);

  debug.innerText =
    "Red\n" +
    "Local Pos X : " +
    ball1.position.x.toFixed(2) +
    "\n" +
    "World Pos X : " +
    ball1WorldPosition.x.toFixed(2) +
    "\n" +
    "\nGreen\n" +
    "Local Pos X : " +
    ball2.position.x.toFixed(2) +
    "\n" +
    "World Pos X : " +
    ball2WorldPosition.x.toFixed(2) +
    "\n" +
    "\nBlue\n" +
    "Local Pos X : " +
    ball3.position.x.toFixed(2) +
    "\n" +
    "World Pos X : " +
    ball3WorldPosition.x.toFixed(2) +
    "\n";

  stats.update();
}

animate();
