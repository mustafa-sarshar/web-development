import { workerData, parentPort } from "node:worker_threads";

const calcFactorial = (num: number): number => {
  if (num === 0 || num === 1) return 1;
  for (let i = num - 1; i >= 1; i--) {
    num *= i;
  }
  for (let i = 0; i < 2_000_000_000; i++) {}
  return num;
};

parentPort?.postMessage(calcFactorial(workerData.payload["num"] || 1));
