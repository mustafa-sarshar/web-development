import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class UtilityService {
  constructor() {}

  public handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error ocurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email already exists!";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exists!";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is invalid!";
        break;
      case "USER_DISABLED":
        errorMessage =
          "The user account has been disabled by an administrator!";
        break;
      case "INVALID_ID_TOKEN":
        errorMessage = "The user's credential is no longer valid.";
        break;
      case "USER_NOT_FOUND":
        errorMessage =
          "There is no user record corresponding to this identifier.";
        break;
      default:
        errorMessage = "Unknown error";
        break;
    }
    return throwError(() => new Error(errorMessage));
  }

  public isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    } else {
      const expiry = JSON.parse(atob(token.split(".")[1])).exp;
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    }
  }
}
