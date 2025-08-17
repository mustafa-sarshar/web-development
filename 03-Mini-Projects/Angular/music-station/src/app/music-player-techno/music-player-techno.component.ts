import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MusicPlayerTechnoService } from "./music-player-techno.service";

@Component({
  selector: "my-music-player-techno",
  templateUrl: "./music-player-techno.component.html",
  styleUrl: "./music-player-techno.component.scss",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [MusicPlayerTechnoService],
})
export class MusicPlayerTechnoComponent implements OnInit {
  public tracks: string[] = [];

  constructor(private readonly _musicPlayerTechno: MusicPlayerTechnoService) {}

  public ngOnInit() {
    this.tracks = this._musicPlayerTechno.getTrackNames();
  }

  public playTrack(track: string) {
    this._musicPlayerTechno.playTrack(track);
  }

  public stopAll() {
    this._musicPlayerTechno.stop();
  }

  public isPlaying(track: string): boolean {
    return this._musicPlayerTechno.getCurrentTrack() === track;
  }

  public getCurrentTrack() {
    return this._musicPlayerTechno.getCurrentTrack();
  }
}
