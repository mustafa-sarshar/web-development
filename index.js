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

    const geometry = new THREE.ConeGeometry(1, 2, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x3689d1 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 10;

    divAnimationEl.append(renderer.domElement);

    (function animate() {
      renderer.render(scene, camera);
      if (orientations.alpha && orientations.beta && orientations.gamma) {
        cube.rotation.x = deg2Rad(+orientations.beta);
        cube.rotation.y = deg2Rad(+orientations.gamma);
        cube.rotation.z = deg2Rad(+orientations.alpha);
      }

      requestAnimationFrame(animate);
    })();
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

    updateFieldIfNotNull("Gyroscope_x", event.rotationRate.beta);
    updateFieldIfNotNull("Gyroscope_y", event.rotationRate.gamma);
    updateFieldIfNotNull("Gyroscope_z", event.rotationRate.alpha);
    incrementEventCount();
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

  // Extended Kalman Filter

  function getOrientation(callback) {
    window.addEventListener("deviceorientation", (event) => {
      const alpha = event.alpha;
      const beta = event.beta;
      const gamma = event.gamma;
      callback(alpha, beta, gamma);
    });
  }

  function getAcceleration(callback) {
    window.addEventListener("devicemotion", (event) => {
      const acceleration = event.acceleration;
      const x = acceleration.x;
      const y = acceleration.y;
      const z = acceleration.z;
      callback(x, y, z);
    });
  }

  const GRAVITY = 9.81;

  function getPositionAndVelocity(callback) {
    let alpha = 0;
    let beta = 0;
    let gamma = 0;
    let x = 0;
    let y = 0;
    let z = 0;
    let lastTimestamp = 0;

    getOrientation((_alpha, _beta, _gamma) => {
      alpha = _alpha;
      beta = _beta;
      gamma = _gamma;
    });

    getAcceleration((_x, _y, _z) => {
      x = _x;
      y = _y;
      z = _z;
      const timestamp = Date.now();
      if (lastTimestamp !== 0) {
        const dt = (timestamp - lastTimestamp) / 1000;
        const ax = x * GRAVITY;
        const ay = y * GRAVITY;
        const az = z * GRAVITY;
        const rotationMatrix = getRotationMatrix(alpha, beta, gamma);
        const acceleration = rotateVector([ax, ay, az], rotationMatrix);
        const velocity = [0, 0, 0];
        const position = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
          velocity[i] += acceleration[i] * dt;
          position[i] += velocity[i] * dt;
        }
        callback(position, velocity);
      }
      lastTimestamp = timestamp;
    });
  }

  function getRotationMatrix(alpha, beta, gamma) {
    const degToRad = Math.PI / 180;
    const phi = gamma * degToRad;
    const theta = beta * degToRad;
    const psi = alpha * degToRad;
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
    const cosPsi = Math.cos(psi);
    const sinPsi = Math.sin(psi);
    const R11 = cosPhi * cosPsi - sinPhi * cosTheta * sinPsi;
    const R12 = cosPhi * sinPsi + sinPhi * cosTheta * cosPsi;
    const R13 = sinPhi * sinTheta;
    const R21 = -sinPsi * cosTheta;
    const R22 = cosPsi * cosTheta;
    const R23 = sinTheta;
    const R31 = sinPhi * cosPsi + cosPhi * cosTheta * sinPsi;
    const R32 = sinPhi * sinPsi - cosPhi * cosTheta * cosPsi;
    const R33 = cosPhi * sinTheta;
    return [
      [R11, R12, R13],
      [R21, R22, R23],
      [R31, R32, R33],
    ];
  }

  function rotateVector(vector, matrix) {
    const result = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        result[i] += vector[j] * matrix[i][j];
      }
    }
    return result;
  }

  setInterval(() => {
    if (is_running) {
      getPositionAndVelocity((position, velocity) => {
        updateFieldIfNotNull("Position_x", position[0]);
        updateFieldIfNotNull("Position_y", position[1]);
        updateFieldIfNotNull("Position_z", position[2]);

        updateFieldIfNotNull("Velocity_x", velocity[0]);
        updateFieldIfNotNull("Velocity_y", velocity[1]);
        updateFieldIfNotNull("Velocity_z", velocity[2]);
      });
    }
  }, 1000);
});
