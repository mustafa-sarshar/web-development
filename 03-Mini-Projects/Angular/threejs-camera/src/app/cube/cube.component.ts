// Source: https://medium.com/geekculture/hello-cube-your-first-three-js-scene-in-angular-176c44b9c6c0 (accessed on April 11.2023)

import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-cube",
  templateUrl: "./cube.component.html",
  styleUrls: ["./cube.component.scss"],
})
export class CubeComponent implements OnInit, AfterViewInit {
  @ViewChild("canvas") private canvasRef!: ElementRef;

  // Cube properties:
  @Input() public rotationSpeedX: number = 0.001; // rotation speed of cube on x-axis
  @Input() public rotationSpeedY: number = 0.001; // rotation speed of cube on y-axis
  @Input() public size: number = 200; // size of the cube
  @Input() public texture: string =
    "./assets/images/photos_2022_10_19_fst_subtle-grunge.jpg"; // if you want to add a texture to your cube

  // Stage properties:
  @Input() public cameraZ: number = 200; // camera position on the z-axis
  @Input() public fieldOfView: number = 1; // field of view of the camera
  // Near and far clipping planes are imaginary planes located at two particular distances from the camera along the camera’s sight line. Only objects between a camera’s two clipping planes are rendered in that camera’s view.
  @Input() public nearClippingPlane: number = 1;
  @Input() public farClippingPlane: number = 1000;

  // Helper properties:(Private properties)
  private camera!: THREE.PerspectiveCamera;
  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshBasicMaterial({
    map: this.loader.load(this.texture),
  });

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;

  constructor() {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  /**
   * Create the scene
   *
   * @private
   * @memberof CubeComponent
   */
  private createScene(): void {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.add(this.cube);

    //* Camera
    const aspectRatio: number = this.getAspectRation();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ;
  }

  /**
   * Get current Aspect Ratio of the Canvas Element
   *
   * @private
   * @memberof CubeComponent
   */
  private getAspectRation(): number {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
   * Animate Cube
   *
   * @private
   * @memberof CubeComponent
   */
  private animateCube(): void {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  /**
   * Start the rendering loop
   *
   * @private
   * @memberof CubeComponent
   */
  private startRenderingLoop(): void {
    //* Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    const component: CubeComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      component.animateCube();
      window.requestAnimationFrame(render);
    })();
  }
}
