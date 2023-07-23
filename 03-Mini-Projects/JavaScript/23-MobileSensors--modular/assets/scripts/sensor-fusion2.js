export class SensorFusion {
  constructor(options) {
    this.options = options;
    this.orientation = [0, 0, 0];
    this.velocity = [0, 0, 0];
    this.position = [0, 0, 0];
    this.gravity = 9.81; // m/s^2
    this.alpha = 0.8; // complementary filter constant
    this.beta = 0.2; // complementary filter constant
    this.lastTimestamp = null;
  }

  start() {
    return this.options.sensor.start();
  }

  stop() {
    this.options.sensor.stop();
  }

  onSensorData(accelerometer, gyroscope, magnetometer) {
    const calibratedAccelerometer =
      this.options.sensorCalibration.getCalibratedAccelerometer(accelerometer);

    // Compute time delta since last sensor reading
    const timestamp = gyroscope.timestamp;
    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
      return;
    }
    const dt = (timestamp - this.lastTimestamp) / 1000; // convert to seconds
    this.lastTimestamp = timestamp;

    // Compute orientation using gyroscope data
    const wx = (gyroscope.x * Math.PI) / 180; // convert to radians
    const wy = (gyroscope.y * Math.PI) / 180;
    const wz = (gyroscope.z * Math.PI) / 180;
    const cy = Math.cos(this.orientation[0]);
    const sy = Math.sin(this.orientation[0]);
    const cp = Math.cos(this.orientation[1]);
    const sp = Math.sin(this.orientation[1]);
    const cr = Math.cos(this.orientation[2]);
    const sr = Math.sin(this.orientation[2]);
    const Rx = [
      [1, 0, 0],
      [0, cy, -sy],
      [0, sy, cy],
    ];
    const Ry = [
      [cp, 0, sp],
      [0, 1, 0],
      [-sp, 0, cp],
    ];
    const Rz = [
      [cr, -sr, 0],
      [sr, cr, 0],
      [0, 0, 1],
    ];
    const R = math.multiply(math.multiply(Rz, Ry), Rx);
    const omega = math.matrix([[wx], [wy], [wz]]);
    const dR = math.multiply(R, math.multiply(omega, dt));
    const newR = math.add(R, dR);
    const newOrientation = [
      Math.atan2(newR[1][2], newR[2][2]),
      Math.atan2(-newR[0][2], Math.sqrt(newR[1][2] ** 2 + newR[2][2] ** 2)),
      Math.atan2(newR[0][1], newR[0][0]),
    ];
    this.orientation = newOrientation;

    // Compute gravity vector in world coordinates
    const gravityWorld = math.multiply(
      math.multiply(Rz, Ry),
      math.matrix([[0], [0], [-this.gravity]])
    );

    // Compute acceleration in world coordinates
    const accelerationWorld = math.matrix([
      [calibratedAccelerometer.x],
      [calibratedAccelerometer.y],
      [calibratedAccelerometer.z],
    ]);
    accelerationWorld._data[0][0] -= gravityWorld._data[0][0];
    accelerationWorld._data[1][0] -= gravityWorld._data[1][0];
    accelerationWorld._data[2][0] -= gravityWorld._data[2][0];

    // Integrate velocity using acceleration
    const newVelocity = [
      this.velocity[0] + accelerationWorld._data[0][0] * dt,
      this.velocity[1] + accelerationWorld._data[1][0] * dt,
      this.velocity[2] + accelerationWorld._data[2][0] * dt,
    ];
    this.velocity = newVelocity;

    // Integrate position using velocity
    const newPosition = [
      this.position[0] + this.velocity[0] * dt,
      this.position[1] + this.velocity[1] * dt,
      this.position[2] + this.velocity[2] * dt,
    ];
    this.position = newPosition;

    // Apply complementary filter to orientation
    const alpha = this.alpha;
    const beta = this.beta;
    const newOrientationComplementary = [
      alpha * newOrientation[0] + beta * this.orientation[0],
      alpha * newOrientation[1] + beta * this.orientation[1],
      alpha * newOrientation[2] + beta * this.orientation[2],
    ];
    this.orientation = newOrientationComplementary;

    this.options.onSensorFusionData(
      this.position,
      this.velocity,
      this.orientation
    );
  }
}
