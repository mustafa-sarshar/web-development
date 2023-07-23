import { Sensor } from "./sensor.js";
import { SensorCalibration } from "./sensor-calibration.js";
import { SensorFusion } from "./sensor-fusion.js";

window.addEventListener("load", (_) => {
  // Create a new sensor object to receive sensor data
  const sensor = new Sensor({
    onSensorData: (accelerometer, gyroscope, magnetometer) => {
      // Pass sensor data to the sensor calibration and sensor fusion modules
      sensorCalibration.onSensorData(accelerometer, gyroscope, magnetometer);
      sensorFusion.onSensorData(accelerometer, gyroscope, magnetometer);
    },
  });

  // Create a new sensor calibration object to compute the accelerometer bias, variance, and standard deviation
  const sensorCalibration = new SensorCalibration({
    sensor,
    sampleCount: 100,
    samples: [
      [0, 0, -9.81],
      [0, 0, 9.81],
      [9.81, 0, 0],
      [-9.81, 0, 0],
      [0, 9.81, 0],
      [0, -9.81, 0],
    ],
    // This function is called when the sensor calibration is complete
    onSensorCalibrationData: (mean, variance, standardDeviation) => {
      console.log("Accelerometer bias:", mean);
      console.log("Accelerometer variance:", variance);
      console.log("Accelerometer standard deviation:", standardDeviation);
    },
  });

  // Create a new sensor fusion object to estimate the calibrated 3D position and velocity
  const sensorFusion = new SensorFusion({
    sensorCalibration,
    // This function is called whenever the sensor fusion estimates a new position and velocity
    onSensorFusionData: (position, velocity, orientation) => {
      console.log("Position:", position);
      console.log("Velocity:", velocity);
      console.log("Orientation:", orientation);
    },
  });

  // Start the sensor, sensor calibration, and sensor fusion
  if (sensor) {
    // Start the sensor, sensor calibration, and sensor fusion
    sensor
      .start()
      .then(() => {
        console.log("Sensor started.");
        return sensorCalibration.start();
      })
      .then(() => {
        console.log("Sensor calibration started.");
        // return sensorFusion.start();
        console.log(sensorFusion);
      })
      .then(() => {
        console.log("Sensor fusion started.");
      })
      .catch((error) => {
        console.error("Error starting sensor fusion:", error);
      });
  }
});
