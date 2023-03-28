import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";

type PositionXY = {
  x: number;
  y: number;
};

type DrawMethods = "STROKE" | "FILL";
type DrawTypes = "LINE" | "RECT" | "ARC" | "CIRCLE";

@Component({
  selector: "app-basics",
  templateUrl: "./basics.component.html",
  styleUrls: ["./basics.component.scss"],
})
export class BasicsComponent implements OnInit, AfterViewInit {
  @ViewChild("formEl", { static: true }) formEl!: ElementRef;
  @ViewChild("canvasEl", { static: true }) canvasEl!: ElementRef;
  public form!: HTMLFormElement;
  public canvas!: HTMLCanvasElement;
  public context2D!: CanvasRenderingContext2D | null;
  public drawingSettings = {
    draw: "LINE",
    drawMethod: "STROKE",
    pointerPosOnDown: { x: 0, y: 0 },
    pointerPosOnUp: { x: 0, y: 0 },
  };

  constructor() {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.form = this.formEl.nativeElement;

    this.canvas = this.canvasEl.nativeElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context2D = this.canvas.getContext("2d");
  }

  public onChangeForm(formEl: HTMLFormElement): void {
    this.drawingSettings.draw = formEl["drawing"].value;
  }

  public onPointerDown(pointerEvent: PointerEvent): void {
    this.drawingSettings.pointerPosOnDown = {
      x: pointerEvent.clientX - this.canvas.offsetLeft,
      y: pointerEvent.clientY - this.canvas.offsetTop,
    };
    console.log("drawingSettings", this.drawingSettings);
  }

  public onPointerUp(pointerEvent: PointerEvent): void {
    this.drawingSettings.pointerPosOnUp = {
      x: pointerEvent.clientX - this.canvas.offsetLeft,
      y: pointerEvent.clientY - this.canvas.offsetTop,
    };
    console.log("drawingSettings", this.drawingSettings);

    switch (this.drawingSettings.draw) {
      case "LINE":
        this.drawLine();
        break;
      case "RECT":
        this.drawRect();
        break;
      case "ARC":
        this.drawArc();
        break;
      case "CIRCLE":
        this.drawCircle();
        break;
      default:
        break;
    }
  }

  public strokeContext(drawColor: string = "#111111"): void {
    // this.context2D?.strokeStyle = drawColor;
    this.context2D?.stroke();
  }

  public drawLine(): void {
    this.context2D?.beginPath();
    this.context2D?.moveTo(
      this.drawingSettings.pointerPosOnDown.x,
      this.drawingSettings.pointerPosOnDown.y
    );
    this.context2D?.lineTo(
      this.drawingSettings.pointerPosOnUp.x,
      this.drawingSettings.pointerPosOnUp.y
    );

    switch (this.drawingSettings.drawMethod) {
      case "STROKE":
        this.strokeContext("STROKE");
        break;
      default:
        break;
    }
  }

  public drawRect(): void {
    if (this.drawingSettings.drawMethod === "STROKE") {
      this.context2D?.strokeRect(
        this.drawingSettings.pointerPosOnDown.x,
        this.drawingSettings.pointerPosOnDown.y,
        this.drawingSettings.pointerPosOnUp.x -
          this.drawingSettings.pointerPosOnDown.x,
        this.drawingSettings.pointerPosOnUp.y -
          this.drawingSettings.pointerPosOnDown.y
      );
    }
  }

  public drawArc(): void {
    let startAngle = 0;
    let endAngle = Math.PI * 1;
    const x1 = this.drawingSettings.pointerPosOnDown.x;
    const y1 = this.drawingSettings.pointerPosOnDown.y;
    const x2 = this.drawingSettings.pointerPosOnUp.x;
    const y2 = this.drawingSettings.pointerPosOnUp.y;
    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    if (
      this.drawingSettings.pointerPosOnDown.x <
      this.drawingSettings.pointerPosOnUp.x
    ) {
    }
    if (
      this.drawingSettings.pointerPosOnDown.x <
      this.drawingSettings.pointerPosOnUp.x
    ) {
    }
    this.context2D?.beginPath();
    this.context2D?.arc(
      x1,
      y1,
      radius,
      angle - Math.PI * 0.5,
      angle + Math.PI * 0.5,
      false
    );

    switch (this.drawingSettings.drawMethod) {
      case "STROKE":
        this.strokeContext("STROKE");
        break;
      default:
        break;
    }
  }

  public drawCircle(): void {
    const x1 = this.drawingSettings.pointerPosOnDown.x;
    const y1 = this.drawingSettings.pointerPosOnDown.y;
    const x2 = this.drawingSettings.pointerPosOnUp.x;
    const y2 = this.drawingSettings.pointerPosOnUp.y;
    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    this.context2D?.beginPath();
    this.context2D?.arc(x1, y1, radius, 0, Math.PI * 2, false);

    switch (this.drawingSettings.drawMethod) {
      case "STROKE":
        this.strokeContext("STROKE");
        break;
      default:
        break;
    }
  }
}
