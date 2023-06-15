import { formData } from "./forms";

const formEl = document.querySelector("form")!;

formEl.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const dataForm = formData(formEl);
  console.log(dataForm);
});

class User {
  public username: string;
  public age: number;

  constructor(username: string, age: number) {
    this.username = username;
    this.age = age;
  }

  public summary(): string {
    return `${this.username} is ${this.age}-years old!`;
  }
}

const user1 = new User("David", 25);
console.log(user1.summary());
