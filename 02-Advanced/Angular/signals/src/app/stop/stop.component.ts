import { Component } from "@angular/core";

import { StopService } from "./stop.service";
import { CounterComponent } from "../counter/counter.component";

@Component({
  selector: "app-stop",
  templateUrl: "./stop.component.html",
  styleUrl: "./stop.component.scss",
  standalone: true,
  imports: [CounterComponent],
  providers: [StopService],
})
export class StopComponent {}
