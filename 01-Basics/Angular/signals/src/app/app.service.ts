import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppService {
  public action = signal<"INC" | "DEC" | null>(null);

  constructor() {}
}
