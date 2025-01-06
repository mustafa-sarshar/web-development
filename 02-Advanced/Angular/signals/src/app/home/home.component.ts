import { Component } from "@angular/core";

import { HomeService } from "./home.service";
import { CounterComponent } from "../counter/counter.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  standalone: true,
  imports: [CounterComponent],
  providers: [HomeService],
})
export class HomeComponent {}
