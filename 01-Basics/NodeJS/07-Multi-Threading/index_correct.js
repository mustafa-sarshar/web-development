const { Worker } = require("node:worker_threads");

const CalcFib = (iterations, idx) => {
  return new Promise((resolve, reject) => {
    const timeStart = Date.now();

    // Start Worker
    const worker = new Worker("./fib.js", {
      workerData: {
        payload: iterations,
      },
    });

    // Listen for message from Worker
    worker.once("message", (data) => {
      console.log(
        `Worker [${worker.threadId}] did CalcFib(idx=${idx}) in ${
          Date.now() - timeStart
        }ms`
      );
      resolve(data);
    });

    // Listen for error from Worker
    worker.once("error", (error) => {
      reject(error);
    });
  });
};

const main = async () => {
  try {
    const timeStart = Date.now();

    const results = await Promise.all([
      CalcFib(40, 0),
      CalcFib(40, 1),
      CalcFib(40, 2),
      CalcFib(40, 3),
      CalcFib(40, 4),
      CalcFib(40, 5),
      CalcFib(40, 6),
      CalcFib(40, 7),
      CalcFib(40, 8),
      CalcFib(40, 9),
    ]);
    console.log("Results:", results);
    console.log(`All calcs done in ${Date.now() - timeStart}ms`);
  } catch (error) {
    console.error(error);
  }
};

main();
