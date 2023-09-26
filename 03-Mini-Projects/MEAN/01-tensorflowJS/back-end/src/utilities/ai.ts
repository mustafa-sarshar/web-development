import * as tf from "@tensorflow/tfjs";
import { ModelInputData, ModelTrainSettings } from "../models/ai";

export const trainModel = async (
  data: ModelInputData,
  settings: ModelTrainSettings,
  processId: string
): Promise<any> => {
  // Define a simple model.
  const model: tf.Sequential = tf.sequential();

  // Input Layer
  model.add(
    tf.layers.dense({
      units: settings.inputLayer.units,
      activation: settings.inputLayer.activation,
      inputShape: settings.inputLayer.inputShape,
    })
  );
  // Output Layer
  model.add(
    tf.layers.dense({
      units: settings.outputLayer.units,
      activation: settings.outputLayer.activation,
    })
  );

  // Define Compiler Settings
  model.compile({
    loss: settings.compiler.loss,
    optimizer: settings.compiler.optimizer,
    metrics: settings.compiler.metrics,
  });

  // Define Callbacks
  const callbacks = {
    onEpochEnd: (epoch: number, logs: tf.Logs | undefined) => {
      if (logs) {
        console.log(
          `ProcessId: ${processId}, Epoch ${epoch}: loss = ${logs.loss}`
        );
      }
    },
  };

  // Train the model.
  const result = await model.fit(data.xs, data.ys, {
    epochs: 3,
    validationData: [data.valXs, data.valYs],
    callbacks: callbacks,
  });

  return result;
};
