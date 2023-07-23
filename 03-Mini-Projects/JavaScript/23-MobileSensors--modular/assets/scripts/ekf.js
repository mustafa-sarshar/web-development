// Define the state vector x and measurement vector z
const StateVector = [0, 0, 0, 0, 0, 0]; // [x, y, z, vx, vy, vz]
const MeasurementVector = [0, 0, 0]; // [ax, ay, az]

// Define the EKF variables
let x = StateVector.slice(0); // initial state vector
const P = [
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1],
]; // initial state covariance matrix
const Q = [
  [0.1, 0, 0, 0, 0, 0],
  [0, 0.1, 0, 0, 0, 0],
  [0, 0, 0.1, 0, 0, 0],
  [0, 0, 0, 0.1, 0, 0],
  [0, 0, 0, 0, 0.1, 0],
  [0, 0, 0, 0, 0, 0.1],
]; // process noise covariance matrix
const R = [
  [0.01, 0, 0],
  [0, 0.01, 0],
  [0, 0, 0.01],
]; // measurement noise covariance matrix

// Define the EKF functions
function f(x, dt) {
  const F = [
    [1, 0, 0, dt, 0, 0],
    [0, 1, 0, 0, dt, 0],
    [0, 0, 1, 0, 0, dt],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1],
  ]; // state transition matrix
  const u = [0, 0, 0, 0, 0, 0]; // control vector
  const B = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [dt, 0, 0],
    [0, dt, 0],
    [0, 0, dt],
  ]; // control input matrix

  const x1 = math.multiply(F, x);
  const x2 = math.multiply(B, u);
  return math.add(x1, x2);
}

function h(x) {
  const H = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ]; // measurement matrix

  const ax = x[3];
  const ay = x[4];
  const az = x[5];
  return [ax, ay, az];
}

function ekf(x, P, z, dt) {
  // Prediction step
  const x_pred = f(x, dt);
  const P_pred = math.add(
    math.multiply(math.multiply(F, P), math.transpose(F)),
    Q
  );

  // Update step
  const z_pred = h(x_pred);
  const y = math.subtract(z, z_pred);
  const S = math.add(
    math.multiply(math.multiply(H, P_pred), math.transpose(H)),
    R
  );
  const K = math.multiply(
    math.multiply(P_pred, math.transpose(H)),
    math.inv(S)
  );
  const x_new = math.add(x_pred, math.multiply(K, y));
  const P_new = math.multiply(
    math.subtract(math.eye(6), math.multiply(K, H)),
    P_pred
  );

  return [x_new, P_new];
}

// Define the Sensor fusion function
function sensorFusion(ax, ay, az, dt) {
  // Calibrate data to remove drift and noise
  ax -= 0.1; // example calibration values
  ay += 0.2;
  az -= 0.05;

  // Run EKF
  const z = [ax, ay, az];
  [x, P] = ekf(x, P, z, dt);

  // Return the estimated position and velocity
  const position = [x[0], x[1], x[2]];
  const velocity = [x[3], x[4], x[5]];
  return { position, velocity };
}

// Example usage
const dt = 0.1; // time step
let previousTime = Date.now();
let previousPosition = [0, 0, 0];

function updatePosition(ax, ay, az) {
  const currentTime = Date.now();
  const elapsedTime = (currentTime - previousTime) / 1000; // convert to seconds
  previousTime = currentTime;

  const { position, velocity } = sensorFusion(ax, ay, az, elapsedTime);

  // Calculate current position by integrating velocity
  const currentPosition = [
    previousPosition[0] + velocity[0] * elapsedTime,
    previousPosition[1] + velocity[1] * elapsedTime,
    previousPosition[2] + velocity[2] * elapsedTime,
  ];
  previousPosition = currentPosition;

  console.log("Current position:", currentPosition);
  console.log("Current velocity:", velocity);
}

// Example sensor data
const ax = 0.1;
const ay = -0.2;
const az = 9.8;

updatePosition(ax, ay, az);
