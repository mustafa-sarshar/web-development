import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { ApiService } from "src/app/shared/services/api/api.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public formGroupEl?: FormGroup;
  public isDataFetching: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  public ngOnInit(): void {
    this.formGroupEl = new FormGroup({
      email: new FormControl(
        {
          value: "",
          disabled: this.isDataFetching,
        },
        [Validators.required, Validators.minLength(5)]
      ),
      password: new FormControl(
        {
          value: "",
          disabled: this.isDataFetching,
        },
        [Validators.required, Validators.minLength(5)]
      ),
    });
  }

  public onClickCancel(): void {}

  public onClickSubmit(): void {
    const { email, password } = this.formGroupEl?.value;
    this.apiService.login({ email, password }).subscribe({
      next: (response) => {
        localStorage.setItem("auth-data", JSON.stringify(response.result));
        this.router.navigate(["/home"]);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
