import { Component } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: "app-mat-sidenavs",
  templateUrl: "./mat-sidenavs.component.html",
  styleUrls: ["./mat-sidenavs.component.scss"],
})
export class MatSidenavsComponent {
  sidenavOpened1 = false;
  sidenavOpened2 = false;
  sidenavOpened3 = false;

  onLogState(sidenavEl: MatSidenav): void {
    if (sidenavEl.opened) {
      console.log("Sidenav opened");
    } else {
      console.log("Sidenav closed");
    }
  }
}
