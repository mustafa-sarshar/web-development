export class User {
  constructor(
    public _id: string,
    public username: string,
    public avatar: string,
  ) {}

  get avatarPath() {
    return "icons/" + this.avatar;
  }
}
