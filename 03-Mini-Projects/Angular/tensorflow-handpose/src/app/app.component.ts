import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";

import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as handPoseModel from "@tensorflow-models/handpose";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("video", { static: true }) public videoRef?: ElementRef;
  @ViewChild("canvas", { static: true }) public canvasRef?: ElementRef;
  public videoEl?: HTMLVideoElement;
  public canvasEl?: HTMLCanvasElement;
  public context2D?: CanvasRenderingContext2D | null;
  private mediaConstraints = {
    video: true,
  };
  public CAMERA_SETTINGS = {
    width: 640,
    height: 480,
    cameraSpeedPerSecond: 10,
  };
  public modelLoaded?: handPoseModel.HandPose;
  private cameraStreamIntervalRef: any = null;
  private lastLoop = new Date().getTime();
  private FINGER_JOINTS: any = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
  };

  constructor() {}

  public ngOnInit(): void {}

  public ngAfterViewInit() {
    this.videoEl = this.videoRef?.nativeElement;
    this.canvasEl = this.canvasRef?.nativeElement;
    this.context2D = this.canvasEl?.getContext("2d");

    this.setupDevices();

    if (this.videoEl) {
      this.videoEl.addEventListener("play", () => {
        this.cameraStreamIntervalRef = setInterval(() => {
          if (this.context2D && this.canvasEl && this.videoEl) {
            if (this.modelLoaded) {
              this.detect(this.modelLoaded);
              this.showFps();
            }
          }
        }, this.CAMERA_SETTINGS.cameraSpeedPerSecond);
      });
    }
  }

  public ngOnDestroy(): void {
    if (this.cameraStreamIntervalRef) {
      clearInterval(this.cameraStreamIntervalRef);
      this.cameraStreamIntervalRef = null;
    }
  }

  private setupDevices(): void {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia(this.mediaConstraints)
        .then((mediaStream) => {
          if (this.videoEl) {
            this.videoEl.srcObject = mediaStream;
            this.loadModel();
          }
        })
        .catch((error) => console.error(error));
    }
  }

  public stopCamera(): void {
    if (this.videoEl && this.videoEl.srcObject) {
      (this.videoEl.srcObject as MediaStream)
        .getVideoTracks()
        .forEach((track: any) => track.stop());
    }
  }

  private loadModel(): void {
    handPoseModel
      .load()
      .then((model: handPoseModel.HandPose) => {
        console.log("Model is loaded!", model);
        this.modelLoaded = model;
      })
      .catch((error) => {
        console.error("Model couldn't get loaded!", error);
        this.modelLoaded = undefined;
      });
  }

  private detect(model: handPoseModel.HandPose) {
    if (this.videoEl && this.videoEl.readyState === 4 && this.canvasEl) {
      const width = this.videoEl.width;
      const height = this.videoEl.height;

      this.videoEl.width = width;
      this.videoEl.height = height;

      this.canvasEl.width = width;
      this.canvasEl.height = height;

      // Make detections
      model
        .estimateHands(this.videoEl)
        .then((hands: any) => {
          if (hands && hands.length > 0) {
            this.drawHandLandmarks(hands);
          }
        })
        .catch((error) => console.error(error));
    }
  }

  private drawHandLandmarks(
    predictions: handPoseModel.AnnotatedPrediction[]
  ): void {
    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        const landmarks = prediction.landmarks;

        // Loop through fingers
        for (let i = 0; i < Object.keys(this.FINGER_JOINTS).length; i++) {
          const finger: string = Object.keys(this.FINGER_JOINTS)[i];
          for (let j = 0; j < this.FINGER_JOINTS[finger].length - 1; j++) {
            // Get pairs of joint
            const jointIndex0 = this.FINGER_JOINTS[finger][j];
            const jointIndex1 = this.FINGER_JOINTS[finger][j + 1];

            // Draw path
            if (this.context2D) {
              this.context2D.beginPath();
              this.context2D.moveTo(
                landmarks[jointIndex0][0],
                landmarks[jointIndex0][1]
              );
              this.context2D.lineTo(
                landmarks[jointIndex1][0],
                landmarks[jointIndex1][1]
              );
              this.context2D.strokeStyle = "plum";
              this.context2D.lineWidth = 2;
              this.context2D.stroke();
            }
          }
        }

        // Loop through landmarks
        for (let i = 0; i < landmarks.length; i++) {
          const x = landmarks[i][0];
          const y = landmarks[i][1];
          if (this.context2D) {
            this.context2D.beginPath();
            this.context2D.arc(x, y, 5, 0, Math.PI * 2);
            this.context2D.fillStyle = "indigo";
            this.context2D.fill();
          }
        }
      });
    }
  }

  private showFps(): void {
    if (this.context2D) {
      this.context2D.font = "30px Arial";
      this.context2D.fillText(`fps: ${this.getFps().toFixed(0)}`, 50, 50);
    }
  }

  private getFps(): number {
    const thisLoop = new Date().getTime();
    const fps = 1000 / (thisLoop - this.lastLoop);
    this.lastLoop = thisLoop;

    return fps;
  }
}
