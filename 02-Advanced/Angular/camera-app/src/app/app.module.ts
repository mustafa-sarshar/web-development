import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CanvasDirective } from "./shared/directives/canvas.directive";
import { PaintAreaDirective } from "./views/paint/paint-area.directive";

@NgModule({
  declarations: [AppComponent, CanvasDirective, PaintAreaDirective],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
