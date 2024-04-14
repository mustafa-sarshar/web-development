import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

class Player {
  constructor(
    public _id: string,
    public score: number = 0,
    public freeThrowsAttempt: number = 0,
    public freeThrowsMade: number = 0,
    public threePoints: number = 0,
    public fouls: number = 0,
  ) {}
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  public formGroupEl?: FormGroup;
  public players: Player[] = [];
  public playerNew?: Player;

  constructor() {}

  public ngOnInit(): void {
    this.formGroupEl = this._initForm();
  }

  public ngOnDestroy(): void {}

  public onChangeInput(fieldId: string, val: any) {
    if (this.playerNew) {
      switch (fieldId) {
        case "playerId":
          this.playerNew._id = val;
          break;
        case "playerScore":
          this.playerNew.score = +val;
          break;
        case "playerFreeThrowsAttempt":
          this.playerNew.freeThrowsAttempt = +val;
          break;
        case "playerFreeThrowsMade":
          this.playerNew.freeThrowsMade = +val;
          break;
        case "playerThreePoints":
          this.playerNew.threePoints = +val;
          break;
        case "playerFouls":
          this.playerNew.fouls = +val;
          break;
        default:
          break;
      }
    }
  }

  public onClickCreatePlayer() {
    if (this.formGroupEl) {
      this.playerNew = new Player(this.formGroupEl.value["playerId"], 0, 0, 0, 0, 0);
    }
  }

  public onClickUpdateScore(playerId: string, val: number, action: "DECREASE" | "INCREASE") {
    const playerFound = this.players.find((player: Player) => player._id === playerId);
    if (playerFound) {
      if (action === "INCREASE") {
        playerFound.score += val;
      } else {
        playerFound.score -= val;
      }
    } else {
      alert(`Player ${playerId} not found`);
    }
  }

  public onClickUpdateFreeThrowAttempt(
    playerId: string,
    val: number,
    action: "DECREASE" | "INCREASE",
  ) {
    const playerFound = this.players.find((player: Player) => player._id === playerId);
    if (playerFound) {
      if (action === "INCREASE") {
        playerFound.freeThrowsAttempt += val;
      } else {
        playerFound.freeThrowsAttempt -= val;
      }
    } else {
      alert(`Player ${playerId} not found`);
    }
  }

  public onClickUpdateFreeThrowMade(
    playerId: string,
    val: number,
    action: "DECREASE" | "INCREASE",
  ) {
    const playerFound = this.players.find((player: Player) => player._id === playerId);
    if (playerFound) {
      if (action === "INCREASE") {
        playerFound.freeThrowsMade += val;
      } else {
        playerFound.freeThrowsMade -= val;
      }
    } else {
      alert(`Player ${playerId} not found`);
    }
  }

  public onClickUpdateThreePoint(playerId: string, val: number, action: "DECREASE" | "INCREASE") {
    const playerFound = this.players.find((player: Player) => player._id === playerId);
    if (playerFound) {
      if (action === "INCREASE") {
        playerFound.threePoints += val;
      } else {
        playerFound.threePoints -= val;
      }
    } else {
      alert(`Player ${playerId} not found`);
    }
  }

  public onClickUpdateFoul(playerId: string, val: number, action: "DECREASE" | "INCREASE") {
    const playerFound = this.players.find((player: Player) => player._id === playerId);
    if (playerFound) {
      if (action === "INCREASE") {
        playerFound.fouls += val;
      } else {
        playerFound.fouls -= val;
      }
    } else {
      alert(`Player ${playerId} not found`);
    }
  }

  public onClickUpdatePropValue(fieldId: string, val: any, action: "INCREASE" | "DECREASE") {
    if (this.formGroupEl && this.playerNew) {
      const scaleVal = action === "INCREASE" ? +1 : -1;

      switch (fieldId) {
        case "playerScore":
          this.playerNew.score += scaleVal * +val;
          this.formGroupEl.get(fieldId)?.setValue(this.playerNew.score);
          break;
        case "playerFreeThrowsAttempt":
          this.playerNew.freeThrowsAttempt += scaleVal * +val;
          this.formGroupEl.get(fieldId)?.setValue(this.playerNew.freeThrowsAttempt);
          break;
        case "playerFreeThrowsMade":
          this.playerNew.freeThrowsMade += scaleVal * +val;
          this.formGroupEl.get(fieldId)?.setValue(this.playerNew.freeThrowsMade);

          this.playerNew.freeThrowsAttempt += scaleVal * 1;
          this.formGroupEl
            .get("playerFreeThrowsAttempt")
            ?.setValue(this.playerNew.freeThrowsAttempt);

          this.playerNew.score += scaleVal * 1;
          this.formGroupEl.get("playerScore")?.setValue(this.playerNew.score);
          break;
        case "playerThreePoints":
          this.playerNew.threePoints += scaleVal * +val;
          this.formGroupEl.get(fieldId)?.setValue(this.playerNew.threePoints);

          this.playerNew.score += scaleVal * 3;
          this.formGroupEl.get("playerScore")?.setValue(this.playerNew.score);
          break;
        case "playerFouls":
          this.playerNew.fouls += scaleVal * +val;
          this.formGroupEl.get(fieldId)?.setValue(this.playerNew.fouls);
          break;
        default:
          break;
      }
    }
  }

  public onClickSubmit() {
    if (this.formGroupEl && this.formGroupEl.status === "VALID") {
      const playerNew = new Player(
        this.formGroupEl.value["playerId"],
        +this.formGroupEl.value["playerScore"],
        +this.formGroupEl.value["playerFreeThrowsAttempt"],
        +this.formGroupEl.value["playerFreeThrowsMade"],
        +this.formGroupEl.value["playerThreePoints"],
        +this.formGroupEl.value["playerFouls"],
      );

      this.players.push(playerNew);

      this._resetFormValues();
      this.playerNew = undefined;
    }
  }

  public onClickReset() {
    this._resetFormValues();
  }

  public onClickResetPlayers() {
    this._resetFormValues();
    this.players = [];
  }

  private _initForm() {
    const formGroupEl = new FormGroup({
      playerId: new FormControl(
        {
          value: "",
          disabled: false,
        },
        [Validators.required],
      ),
      playerScore: new FormControl(
        {
          value: 0,
          disabled: false,
        },
        [Validators.required],
      ),
      playerFreeThrowsAttempt: new FormControl(
        {
          value: 0,
          disabled: false,
        },
        [Validators.required],
      ),
      playerFreeThrowsMade: new FormControl(
        {
          value: 0,
          disabled: false,
        },
        [Validators.required],
      ),
      playerThreePoints: new FormControl(
        {
          value: 0,
          disabled: false,
        },
        [Validators.required],
      ),
      playerFouls: new FormControl(
        {
          value: 0,
          disabled: false,
        },
        [Validators.required],
      ),
    });
    return formGroupEl;
  }

  private _resetFormValues() {
    if (this.formGroupEl) {
      this.formGroupEl.setValue({
        playerId: "",
        playerScore: 0,
        playerFreeThrowsAttempt: 0,
        playerFreeThrowsMade: 0,
        playerThreePoints: 0,
        playerFouls: 0,
      });
    }
  }
}
