import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { ApiService } from "src/app/shared/services/api/api.service";
import { UtilityService } from "src/app/shared/services/utility/utility.service";

@Component({
  selector: "app-add-edit",
  templateUrl: "./add-edit.component.html",
  styleUrls: ["./add-edit.component.scss"],
})
export class AddEditComponent implements OnInit {
  public formGroupEl?: FormGroup;
  public isDataFetching: boolean = false;

  constructor(
    private apiService: ApiService,
    private utilityService: UtilityService,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.formGroupEl = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      imageFile: [null, Validators.required],
      image: null,
    });
  }

  public onChangeImage(event: any) {
    // @ts-ignore
    if (event.target && event.target.files && event.target.files.length > 0) {
      this.formGroupEl?.patchValue({
        image: event.target.files[0],
      });
    }
    console.log(this.formGroupEl);
  }

  public onClickCancel(): void {}

  public onClickSubmit(): void {
    if (this.formGroupEl) {
      const formData: FormData = new FormData();
      formData.append("title", this.formGroupEl.get("title")?.value);
      formData.append("content", this.formGroupEl.get("content")?.value);
      formData.append("image", this.formGroupEl.get("image")?.value);

      const authData = localStorage.getItem("auth-data");

      if (authData) {
        const { token } = JSON.parse(authData);

        const isTokenExpired = this.utilityService.isTokenExpired(token);
        if (!isTokenExpired) {
          this.apiService.createPost(token, formData).subscribe({
            next: (response) => {
              console.log(response);
            },
            error: (error) => {
              console.error(error);
            },
          });
        } else {
          console.info("TOKEN expired", token);
        }
      }
    }
  }
}
