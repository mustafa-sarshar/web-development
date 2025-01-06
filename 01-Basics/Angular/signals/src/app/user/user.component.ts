import { Component, computed, effect, signal } from "@angular/core";

import { User } from "./user.model";
import { AppService } from "../app.service";

@Component({
  selector: "app-user",
  standalone: true,
  imports: [],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.scss",
})
export class UserComponent {
  public users: User[] = [
    new User("0001", "User 1", "noto_older-person.svg"),
    new User("0002", "User 2", "noto_person-red-hair.svg"),
    new User("0003", "User 3", "twemoji_person-beard.svg"),
  ];

  public userSelected = signal(this.users[0]);

  public counter = signal<number>(0);

  public action = computed(() => this._appService.action());

  public doubleCounter = computed(() => this.counter() * 2);

  constructor(private readonly _appService: AppService) {
    effect(() => {
      console.log("Counter: ", this.counter());
    });
  }

  public onClickUser() {
    const randomIdx = Math.floor(Math.random() * this.users.length);

    
    this.userSelected.set(this.users[randomIdx]);
  }

  public onClickCounterInc() {
    this.counter.update((oldVal: number) => oldVal + 1);
  }

  public onClickCounterDec() {
    this.counter.update((oldVal: number) => oldVal - 1);
  }
}
