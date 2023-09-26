import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddEditComponent } from "./pages/posts/add-edit/add-edit.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { AppMaterialModule } from "./app-material.module";
import { LoginComponent } from "./pages/auth/login/login.component";
import { NavigationComponent } from "./shared/ui-gadgets/navigation/navigation.component";
import { HttpClientModule } from "@angular/common/http";
import { WelcomeComponent } from './pages/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEditComponent,
    LoginComponent,
    NavigationComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
