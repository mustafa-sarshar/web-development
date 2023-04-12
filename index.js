import * as THREE from "three";

window.addEventListener("load", (_) => {
  const divAnimationEl = document.getElementById("div-animation");
  const canvasEl = document.getElementById("canvas");
  const demo_button = document.getElementById("start_demo");
  let is_running = false;
  const animationWidth = 300;
  const animationHeight = 300;
  let orientations = {
    alpha: 0,
    beta: 0,
    gamma: 0,
  };

  function deg2Rad(degree) {
    return (degree * Math.PI) / 180;
  }

  function createScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      25,
      animationWidth / animationHeight,
      1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(animationWidth, animationHeight);

    return { scene, camera, renderer };
  }

  function initAnimation() {
    const { scene, camera, renderer } = createScene();

    const geometry = new THREE.BoxGeometry(0.5, 2, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: 0x3689d1 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    divAnimationEl.append(renderer.domElement);

    (function animate() {
      renderer.render(scene, camera);
      if (orientations.alpha && orientations.beta && orientations.gamma) {
        cube.rotation.x = deg2Rad(+orientations.alpha);
        cube.rotation.y = deg2Rad(+orientations.beta);
        cube.rotation.z = deg2Rad(+orientations.gamma);
      }

      requestAnimationFrame(animate);
    })();
  }

  function handleOrientation(event) {
    orientations.alpha = event.alpha;
    orientations.beta = event.beta;
    orientations.gamma = event.gamma;

    updateFieldIfNotNull("Orientation_a", event.alpha);
    updateFieldIfNotNull("Orientation_b", event.beta);
    updateFieldIfNotNull("Orientation_g", event.gamma);
    incrementEventCount();
  }

  function incrementEventCount() {
    let counterElement = document.getElementById("num-observed-events");
    let eventCount = parseInt(counterElement.innerHTML);
    counterElement.innerHTML = eventCount + 1;
  }

  function updateFieldIfNotNull(fieldName, value, precision = 10) {
    if (value != null)
      document.getElementById(fieldName).innerHTML = value.toFixed(precision);
  }

  function handleMotion(event) {
    updateFieldIfNotNull(
      "Accelerometer_gx",
      event.accelerationIncludingGravity.x
    );
    updateFieldIfNotNull(
      "Accelerometer_gy",
      event.accelerationIncludingGravity.y
    );
    updateFieldIfNotNull(
      "Accelerometer_gz",
      event.accelerationIncludingGravity.z
    );

    updateFieldIfNotNull("Accelerometer_x", event.acceleration.x);
    updateFieldIfNotNull("Accelerometer_y", event.acceleration.y);
    updateFieldIfNotNull("Accelerometer_z", event.acceleration.z);

    updateFieldIfNotNull("Accelerometer_i", event.interval, 2);

    updateFieldIfNotNull("Gyroscope_z", event.rotationRate.alpha);
    updateFieldIfNotNull("Gyroscope_x", event.rotationRate.beta);
    updateFieldIfNotNull("Gyroscope_y", event.rotationRate.gamma);
    incrementEventCount();
  }

  demo_button.onclick = function (e) {
    e.preventDefault();
    initAnimation();

    // Request permission for iOS 13+ devices
    if (
      DeviceMotionEvent &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission();
    }

    if (is_running) {
      window.removeEventListener("devicemotion", handleMotion);
      window.removeEventListener("deviceorientation", handleOrientation);
      demo_button.innerHTML = "Start demo";
      demo_button.classList.add("btn-success");
      demo_button.classList.remove("btn-danger");
      is_running = false;
    } else {
      window.addEventListener("devicemotion", handleMotion);
      window.addEventListener("deviceorientation", handleOrientation);
      document.getElementById("start_demo").innerHTML = "Stop demo";
      demo_button.classList.remove("btn-success");
      demo_button.classList.add("btn-danger");
      is_running = true;
    }
  };

  // Light and proximity are not supported anymore by mainstream browsers.
  window.addEventListener("devicelight", function (e) {
    document.getElementById("DeviceLight").innerHTML =
      "AmbientLight current Value: " +
      e.value +
      " Max: " +
      e.max +
      " Min: " +
      e.min;
  });

  window.addEventListener("lightlevel", function (e) {
    document.getElementById("LightLevel").innerHTML = "Light level: " + e.value;
  });

  window.addEventListener("deviceproximity", function (e) {
    document.getElementById("DeviceProximity").innerHTML =
      "DeviceProximity current Value: " +
      e.value +
      " Max: " +
      e.max +
      " Min: " +
      e.min;
  });

  window.addEventListener("userproximity", function (event) {
    document.getElementById("UserProximity").innerHTML =
      "UserProximity: " + event.near;
  });
});
