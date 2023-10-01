import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
} from "@nestjs/common";
import { Response } from "express";

import { CreateMessageDto } from "./dto/create-message.dto";
import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessagesController {
  constructor(private _messagesService: MessagesService) {}

  @Get()
  public listMessages(): Promise<any[]> {
    return this._messagesService.findAll();
  }

  @Post()
  public createMessages(
    @Res() res: Response,
    @Body() body: CreateMessageDto,
  ): Promise<void> {
    return this._messagesService.create(body.content);
  }

  @Get("/:msgId")
  public async getMessageById(@Param("msgId") msgId: string): Promise<any> {
    const messageFound = await this._messagesService.findOne(msgId);

    if (!messageFound) {
      throw new NotFoundException();
    }
    return messageFound;
  }
}
