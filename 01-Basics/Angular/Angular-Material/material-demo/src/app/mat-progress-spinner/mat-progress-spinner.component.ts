import { Component } from "@angular/core";

@Component({
  selector: "app-mat-progress-spinner",
  templateUrl: "./mat-progress-spinner.component.html",
  styleUrls: ["./mat-progress-spinner.component.scss"],
})
export class MatProgressSpinnerComponent {
  progressSpinnerValue: number = 10;
  progressSpinnerIntRef;

  onClickStartProgressSpinner(): void {
    this.progressSpinnerValue = 10;
    this.progressSpinnerIntRef = setInterval(() => {
      if (this.progressSpinnerValue < 90) {
        this.progressSpinnerValue += 10;
      } else {
        this.progressSpinnerIntRef = 0;
      }
    }, 1000);
  }
}
