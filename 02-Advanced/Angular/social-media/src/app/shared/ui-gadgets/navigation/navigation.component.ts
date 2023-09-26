import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent {
  constructor(private router: Router) {}

  public onClickNavItem(navCode: string): void {
    switch (navCode) {
      case "HOME":
        this.router.navigate(["/home"]);
        break;
      case "AUTH_LOGIN":
        this.router.navigate(["/login"]);
        break;
      case "AUTH_LOGOUT":
        localStorage.removeItem("auth-data");
        this.router.navigate(["/home"]);
        break;
      case "POST_ADD":
        this.router.navigate(["/add-edit"]);
        break;
      case "POST_EDIT":
        this.router.navigate(["/add-edit"]);
        break;
      default:
        this.router.navigate(["/home"]);
        break;
    }
  }
}
