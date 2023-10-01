import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

@Injectable()
export class MessagesRepository {
  private readonly filePath: string = "assets/data/messages.json";

  constructor() {}

  public async findOne(_id: string): Promise<any> {
    const contents = await readFile(this.filePath, "utf-8");
    const messages = JSON.parse(contents);

    return messages[_id];
  }

  public async findAll(): Promise<any[]> {
    const contents = await readFile(this.filePath, "utf-8");
    const messages = JSON.parse(contents);

    return { ...messages };
  }

  public async create(content: string): Promise<void> {
    const contents = await readFile(this.filePath, "utf-8");
    const messages = JSON.parse(contents);

    const _id = Math.floor(Math.random() * 1000);
    messages[_id] = { _id, content };

    await writeFile(this.filePath, JSON.stringify(messages));
  }
}
