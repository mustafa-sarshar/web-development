import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MaterialModule } from "./material/material.module";
import { MatIconsComponent } from "./mat-icons/mat-icons.component";
import { MatButtonsComponent } from "./mat-buttons/mat-buttons.component";
import { MatTypographiesComponent } from "./mat-typographies/mat-typographies.component";
import { MatButtonsToggleComponent } from "./mat-buttons-toggle/mat-buttons-toggle.component";
import { MatBadgesComponent } from './mat-badges/mat-badges.component';
import { MatProgressSpinnerComponent } from './mat-progress-spinner/mat-progress-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    MatIconsComponent,
    MatButtonsComponent,
    MatTypographiesComponent,
    MatButtonsToggleComponent,
    MatBadgesComponent,
    MatProgressSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
