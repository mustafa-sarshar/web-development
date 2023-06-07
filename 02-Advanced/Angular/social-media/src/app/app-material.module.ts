import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";

const materials = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule,
  MatListModule,
  MatDialogModule,
];

@NgModule({
  imports: [materials],
  exports: [materials],
})
export class AppMaterialModule {}
