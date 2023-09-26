import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/app/shared/services/api/api.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  public formGroupEl?: FormGroup;

  constructor(private apiService: ApiService, private router: Router) {}

  public ngOnInit(): void {
    this.formGroupEl = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  public onClickCancel(): void {}

  public onClickSubmit(): void {
    const { username, email, password } = this.formGroupEl?.value;
    this.apiService.signup({ username, email, password }).subscribe({
      next: (response) => {
        localStorage.setItem("auth-data", JSON.stringify(response.result));
        // this.router.navigate(["/home"]);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
