import { Component } from "@angular/core";

@Component({
  selector: "app-mat-badges",
  templateUrl: "./mat-badges.component.html",
  styleUrls: ["./mat-badges.component.scss"],
})
export class MatBadgesComponent {
  counterValue: number = 0;

  onClickIncreaseCounter(): void {
    this.counterValue++;
  }

  onClickDecreaseCounter(): void {
    if (this.counterValue > 1) {
      this.counterValue--;
    } else {
      this.counterValue = 0;
    }
  }
}
