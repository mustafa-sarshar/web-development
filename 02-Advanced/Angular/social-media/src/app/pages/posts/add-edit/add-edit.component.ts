import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { ApiService } from "src/app/shared/services/api/api.service";
import { UtilityService } from "src/app/shared/services/utility/utility.service";

@Component({
  selector: "app-add-edit",
  templateUrl: "./add-edit.component.html",
  styleUrls: ["./add-edit.component.scss"],
})
export class AddEditComponent implements OnInit {
  public formGroupEl?: FormGroup;
  public imgPreview?: string;
  public isDataFetching: boolean = false;

  constructor(
    private apiService: ApiService,
    private utilityService: UtilityService
  ) {}

  public ngOnInit(): void {
    this.formGroupEl = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
      imageFile: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
    });
  }

  public onChangeImage(event: Event) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    if (this.formGroupEl && file) {
      this.formGroupEl.patchValue({ image: file });
      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imgPreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  public onClickCancel(): void {}

  public onClickSubmit(): void {
    if (this.formGroupEl) {
      const fd: FormData = new FormData();
      fd.append("title", this.formGroupEl.get("title")?.value);
      fd.append("content", this.formGroupEl.get("content")?.value);
      fd.append("image", this.formGroupEl.get("image")?.value);

      const authData = localStorage.getItem("auth-data");

      if (authData) {
        const { token } = JSON.parse(authData);

        const isTokenExpired = this.utilityService.isTokenExpired(token);
        if (!isTokenExpired) {
          this.apiService.createPost(token, fd).subscribe({
            next: (response) => {
              console.log(response);
              this.formGroupEl?.reset();
              this.imgPreview = "";
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
