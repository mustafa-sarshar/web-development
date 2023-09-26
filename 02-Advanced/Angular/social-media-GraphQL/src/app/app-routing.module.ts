import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AddEditComponent } from "./pages/posts/add-edit/add-edit.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { SignupComponent } from "./pages/auth/signup/signup.component";

const routes: Routes = [
  { path: "home", component: WelcomeComponent },
  { path: "add-edit", component: AddEditComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "**", redirectTo: "/home", pathMatch: "prefix" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
