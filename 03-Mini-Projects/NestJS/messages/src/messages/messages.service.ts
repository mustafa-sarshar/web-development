import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService {
  constructor(private _messagesRepo: MessagesRepository) {}

  public async findOne(_id: string): Promise<any> {
    return this._messagesRepo.findOne(_id);
  }

  public async findAll(): Promise<any[]> {
    return this._messagesRepo.findAll();
  }

  public async create(content: string): Promise<void> {
    return this._messagesRepo.create(content);
  }
}
