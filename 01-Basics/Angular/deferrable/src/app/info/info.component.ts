import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";

import { ArticleCommentsComponent } from "../article-comments/article-comments.component";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";

@Component({
  selector: "app-info",
  standalone: true,
  imports: [ArticleCommentsComponent],
  templateUrl: "./info.component.html",
  styleUrl: "./info.component.scss",
})
export class InfoComponent implements OnInit {
  public isBrowser: boolean = false;
  public isServer: boolean = false;

  constructor(@Inject(PLATFORM_ID) private readonly _platformId: any) {}

  public ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this._platformId);
    this.isServer = isPlatformServer(this._platformId);
  }
}
