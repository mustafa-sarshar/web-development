const accelerometer = new Accelerometer({ frequency: 60 });
const txtResultsEl = document.getElementById("txt-results");

accelerometer.addEventListener("reading", (e) => {
  console.log(`Acceleration along the X-axis ${accelerometer.x}`);
  console.log(`Acceleration along the Y-axis ${accelerometer.y}`);
  console.log(`Acceleration along the Z-axis ${accelerometer.z}`);
  txtResultsEl.innerHTML += `Acc-X: ${accelerometer.x}, Acc-Y: ${accelerometer.y}, Acc-Z: ${accelerometer.z}`;
});


window.onload = (event) => {
    accelerometer.start();
    txtResultsEl.innerHTML += " getting data ...";
}