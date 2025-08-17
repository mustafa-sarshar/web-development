import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";

import { MusicGeneratorService } from "./music-generator.service";

@Component({
  selector: "my-music-generator",
  templateUrl: "./music-generator.component.html",
  styleUrl: "./music-generator.component.scss",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [MusicGeneratorService],
})
export class MusicGeneratorComponent implements OnInit, OnDestroy {
  public musicForm: FormGroup;
  public musicStatus: "START" | "STOP" = "STOP";

  private _tempoSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private musicGenerator: MusicGeneratorService,
  ) {
    this.musicForm = this.fb.group({
      tempo: [
        120,
        [Validators.required, Validators.min(60), Validators.max(240)],
      ],
    });
  }

  public ngOnInit() {
    this._tempoSubscription = this.musicForm
      .get("tempo")
      ?.valueChanges.subscribe((tempo) => {
        this.musicGenerator.setTempo(tempo);
      });
  }

  public ngOnDestroy() {
    this._tempoSubscription?.unsubscribe();
  }

  public startMusic() {
    this.musicGenerator.start();

    this.musicStatus = "START";
  }

  public stopMusic() {
    this.musicGenerator.stop();

    this.musicStatus = "STOP";
  }
}
