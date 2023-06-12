import { Component, OnInit } from "@angular/core";
import { io } from "socket.io-client";

import { ApiService } from "src/app/shared/services/api/api.service";
import { UtilityService } from "src/app/shared/services/utility/utility.service";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {
  public posts: any = [];

  constructor(
    private apiService: ApiService,
    private utilityService: UtilityService
  ) {}

  public ngOnInit(): void {
    const authData = localStorage.getItem("auth-data");

    if (authData) {
      const { token, userId } = JSON.parse(authData);

      const isTokenExpired = this.utilityService.isTokenExpired(token);
      if (!isTokenExpired) {
        this.apiService.getPosts(token).subscribe({
          next: (response) => {
            if (response.result.posts) {
              this.posts = response.result.posts;
            }
          },
          error: (error) => {
            console.error(console.error());
          },
        });
        const socket = io("http://localhost:8282");
        socket.on("POSTS", (data) => {
          console.log("DATA", data);
          if (data.action === "CREATE") {
            this.posts.push(data.post);
          }
        });
      } else {
        console.info("TOKEN expired", token);
      }
    }
  }
}
