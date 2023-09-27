export class UserModel {
  public _id: number = Math.floor(Math.random() * 1000);

  constructor(
    public username: string,
    public email: string,
    public password: string,
  ) {}
}
