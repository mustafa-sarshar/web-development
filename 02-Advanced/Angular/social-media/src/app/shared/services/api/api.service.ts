import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, tap } from "rxjs";

import { UtilityService } from "../utility/utility.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}

  public login(credentials: any): Observable<any> {
    return this.http
      .post<any>("http://localhost:8282/auth/login", {
        email: credentials.email,
        password: credentials.password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.utilityService.handleError),
        tap((resData: any) => {
          this.handleAuthentication(resData, true);
        })
      );
  }

  public createPost(token: string, postData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<any>("http://localhost:8282/feeds/post", postData, {
        headers: headers,
      })
      .pipe(
        catchError(this.utilityService.handleError),
        tap((resData: any) => {
          this.handleAuthentication(resData, false);
        })
      );
  }

  public getPosts(token: string): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<any>("http://localhost:8282/feeds/posts", { headers: headers })
      .pipe(
        catchError(this.utilityService.handleError),
        tap((resData: any) => {
          this.handleAuthentication(resData, false);
        })
      );
  }

  private handleAuthentication(resData: any, login: boolean = false) {
    console.log("LOGGED In", resData);
  }
}
