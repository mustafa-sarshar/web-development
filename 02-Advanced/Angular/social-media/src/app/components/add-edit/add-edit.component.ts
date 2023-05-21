import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-edit",
  templateUrl: "./add-edit.component.html",
  styleUrls: ["./add-edit.component.scss"],
})
export class AddEditComponent implements OnInit {
  public formGroupEl?: FormGroup;
  public isDataFetching: boolean = false;

  public ngOnInit(): void {
    this.formGroupEl = new FormGroup({
      title: new FormControl(
        {
          value: "",
          disabled: this.isDataFetching,
        },
        [Validators.required, Validators.minLength(5)]
      ),
      content: new FormControl(
        {
          value: "",
          disabled: this.isDataFetching,
        },
        [Validators.required, Validators.minLength(5)]
      ),
      image: new FormControl(
        {
          value: "",
          disabled: this.isDataFetching,
        },
        [Validators.required]
      ),
    });
  }

  public onClickCancel() {}

  public onClickSubmit() {
    if (this.formGroupEl) {
      let formData: FormData = new FormData();
      formData.append("title", this.formGroupEl.get("title")?.value);
      formData.append("content", this.formGroupEl.get("content")?.value);
      // formData.append("image", this.formGroupEl.get("image")?.value);
      console.log(this.formGroupEl.get("image"));
    }
  }
}
