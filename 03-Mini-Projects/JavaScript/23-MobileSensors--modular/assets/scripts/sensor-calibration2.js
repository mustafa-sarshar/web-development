export class SensorCalibration {
  constructor(options) {
    this.options = options;
    this.sampleCount = 0;
    this.sampleSum = [0, 0, 0];
    this.bias = [0, 0, 0];
    this.variance = [0, 0, 0];
    this.mean = [0, 0, 0];
    this.standardDeviation = [0, 0, 0];
    this.calibrated = false;
  }

  start() {
    return this.options.sensor.start();
  }

  stop() {
    this.options.sensor.stop();
  }

  onSensorData(accelerometer, gyroscope, magnetometer) {
    if (this.sampleCount === 0) {
      this.sampleSum = [0, 0, 0];
    }
    this.sampleSum[0] += accelerometer.x;
    this.sampleSum[1] += accelerometer.y;
    this.sampleSum[2] += accelerometer.z;
    this.sampleCount++;

    if (this.sampleCount >= this.options.sampleCount) {
      // Compute accelerometer bias from samples
      const mean = [
        this.sampleSum[0] / this.sampleCount,
        this.sampleSum[1] / this.sampleCount,
        this.sampleSum[2] / this.sampleCount,
      ];
      this.bias = mean;
      this.mean = mean;

      // Compute accelerometer variance and standard deviation from samples
      let varianceSum = [0, 0, 0];
      for (let i = 0; i < this.options.sampleCount; i++) {
        const x = this.options.samples[i][0] - this.bias[0];
        const y = this.options.samples[i][1] - this.bias[1];
        const z = this.options.samples[i][2] - this.bias[2];
        varianceSum[0] += x * x;
        varianceSum[1] += y * y;
        varianceSum[2] += z * z;
      }
      const variance = [
        varianceSum[0] / this.options.sampleCount,
        varianceSum[1] / this.options.sampleCount,
        varianceSum[2] / this.options.sampleCount,
      ];
      const standardDeviation = [
        Math.sqrt(variance[0]),
        Math.sqrt(variance[1]),
        Math.sqrt(variance[2]),
      ];
      this.variance = variance;
      this.standardDeviation = standardDeviation;

      this.calibrated = true;
      this.options.onSensorCalibrationData(mean, variance, standardDeviation);
    }
  }

  getCalibratedAccelerometer(accelerometer) {
    if (!this.calibrated) {
      return accelerometer;
    }
    const x = (accelerometer.x - this.bias[0]) / this.standardDeviation[0];
    const y = (accelerometer.y - this.bias[1]) / this.standardDeviation[1];
    const z = (accelerometer.z - this.bias[2]) / this.standardDeviation[2];
    return { x, y, z };
  }
}
