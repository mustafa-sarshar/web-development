export class Sensor {
  constructor(options) {
    this.options = options;
  }

  start() {
    return new Promise((resolve, reject) => {
      if (window.DeviceMotionEvent) {
        window.addEventListener(
          "devicemotion",
          this.onDeviceMotion.bind(this),
          false
        );
        resolve();
      } else {
        reject(new Error("DeviceMotionEvent is not supported."));
      }
    });
  }

  stop() {
    window.removeEventListener(
      "devicemotion",
      this.onDeviceMotion.bind(this),
      false
    );
  }

  onDeviceMotion(event) {
    // const { accelerometer, gyroscope, magnetometer } = event;
    const { acceleration, rotationRate, magnetometer } = event;
    const accelerometer = {
      x: acceleration.x,
      y: acceleration.y,
      z: acceleration.z,
    };
    const gyroscope = {
      x: rotationRate.beta,
      y: rotationRate.gamma,
      z: rotationRate.alpha,
    };

    this.options.onSensorData(accelerometer, gyroscope, magnetometer);
  }
}
