import { workerData, parentPort } from "node:worker_threads";

const calcFib = (num: number): number => {
  var a = 1,
    b = 0,
    temp;

  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }
  for (let i = 0; i < 5_000_000_000; i++) {}

  return b;
};

parentPort?.postMessage(calcFib(workerData.payload["num"] || 1));
