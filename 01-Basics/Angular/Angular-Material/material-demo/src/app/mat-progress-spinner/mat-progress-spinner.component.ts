import { Component } from "@angular/core";

@Component({
  selector: "app-mat-progress-spinner",
  templateUrl: "./mat-progress-spinner.component.html",
  styleUrls: ["./mat-progress-spinner.component.scss"],
})
export class MatProgressSpinnerComponent {
  progressSpinnerValue: number = 10;
  progressSpinnerIntRef;
  showSpinner = false;

  onClickStartProgressSpinner(): void {
    this.progressSpinnerValue = 10;
    this.progressSpinnerIntRef = setInterval(() => {
      if (this.progressSpinnerValue < 90) {
        this.progressSpinnerValue += 10;
      } else {
        this.progressSpinnerValue = 10;
        clearInterval(this.progressSpinnerIntRef);
      }
    }, 500);
  }

  onClickShowSpinner(): void {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 3000);
  }
}
