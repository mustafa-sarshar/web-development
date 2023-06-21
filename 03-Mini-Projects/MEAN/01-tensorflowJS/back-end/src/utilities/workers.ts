import { Worker } from "node:worker_threads";

export const createWorker = (workerFilePath: string, payload: any) => {
  const timeStart = Date.now();

  return new Promise((resolve, reject) => {
    const worker = new Worker(workerFilePath, {
      workerData: { payload: payload },
    });

    worker.on("message", (data) => {
      console.log(
        `Worker [${worker.threadId}] finished in ${Date.now() - timeStart}ms`
      );
      resolve(data);
    });
    worker.on("error", (error: any) => {
      // @ts-ignore
      const errors = { ...error };
      reject(`An error ocurred: ${errors}`);
    });
  });
};
