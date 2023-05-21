import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AddEditComponent } from "./components/add-edit/add-edit.component";

const routes: Routes = [
  { path: "add-edit", component: AddEditComponent },
  { path: "**", redirectTo: "/add-edit", pathMatch: "prefix" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
