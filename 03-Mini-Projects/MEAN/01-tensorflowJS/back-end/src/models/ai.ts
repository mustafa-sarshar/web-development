import * as tf from "@tensorflow/tfjs";

export type ModelInputData = {
  xs: tf.Tensor;
  ys: tf.Tensor;
  valXs: tf.Tensor;
  valYs: tf.Tensor;
};

export type ModelTrainSettings = {
  inputLayer: {
    units: number;
    activation: any;
    inputShape: number[];
  };
  outputLayer: {
    units: number;
    activation: any;
  };
  compiler: {
    loss: string;
    optimizer: string;
    metrics: string[];
  };
};
