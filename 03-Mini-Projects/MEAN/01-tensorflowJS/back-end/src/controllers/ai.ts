import { NextFunction, Request, Response } from "express";
import * as path from "path";
import * as tf from "@tensorflow/tfjs";

import { trainModel } from "../utilities/ai";
import { createWorker } from "../utilities/workers";
import { ModelTrainSettings } from "../models/ai";

export const getModel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { processId } = req.params;

    // Generate some random fake data for demo purposes.
    const xs: tf.Tensor = tf.randomUniform([10000, 200]);
    const ys: tf.Tensor = tf.randomUniform([10000, 1]);
    const valXs: tf.Tensor = tf.randomUniform([1000, 200]);
    const valYs: tf.Tensor = tf.randomUniform([1000, 1]);

    const modelSettings: ModelTrainSettings = {
      inputLayer: { units: 100, activation: "relu", inputShape: [200] },
      outputLayer: { units: 1, activation: "linear" },
      compiler: {
        loss: "meanSquaredError",
        optimizer: "sgd",
        metrics: ["MAE"],
      },
    };

    res.status(200).json({
      message: "AI Model!!!",
      model: modelSettings,
      processId: processId,
    });

    const result = await trainModel(
      { xs, ys, valXs, valYs },
      modelSettings,
      processId
    );
    console.log(`Result of Model(${processId}): ${result}`);
  } catch (error) {
    next(error);
  }
};

export const getModelWorker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { processId } = req.params;

    // Generate some random fake data for demo purposes.
    const xs: tf.Tensor = tf.randomUniform([10000, 200]);
    const ys: tf.Tensor = tf.randomUniform([10000, 1]);
    const valXs: tf.Tensor = tf.randomUniform([1000, 200]);
    const valYs: tf.Tensor = tf.randomUniform([1000, 1]);

    const modelSettings: ModelTrainSettings = {
      inputLayer: { units: 100, activation: "relu", inputShape: [200] },
      outputLayer: { units: 1, activation: "linear" },
      compiler: {
        loss: "meanSquaredError",
        optimizer: "sgd",
        metrics: ["MAE"],
      },
    };

    // Create Worker
    const result = await createWorker(
      path.join(__dirname, "..", "workers", "trainModel.ts"),
      {
        data: { xs, ys, valXs, valYs },
        settings: modelSettings,
        processId: +processId,
      }
    );
    res.status(200).json({ message: `Model(${processId}): ${result}` });
  } catch (error) {
    next(error);
  }
};
