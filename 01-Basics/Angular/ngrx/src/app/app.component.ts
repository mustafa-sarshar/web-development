import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { CounterComponent } from "./counter/counter.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  standalone: true,
  imports: [RouterOutlet, CounterComponent],
})
export class AppComponent {
  title = "ngrx";
}
