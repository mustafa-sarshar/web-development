import { Component } from "@angular/core";

import { UserComponent } from "../user/user.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [UserComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
