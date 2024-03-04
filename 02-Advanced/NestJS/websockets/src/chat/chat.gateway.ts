import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class ChatGateway
  implements
    OnModuleInit,
    OnModuleDestroy,
    OnGatewayConnection,
    OnGatewayDisconnect
{
  @WebSocketServer()
  public server: Server;

  public onModuleInit() {
    this.server.on("connection", (socket: Socket) => {
      console.log(`Connection initialized to Socket ID: ${socket.id}`);
    });
  }

  public onModuleDestroy() {
    this.server.on("destroy", (socket: Socket) => {
      console.log(`Connection destroyed for Socket ID: ${socket.id}`);
    });
  }

  public handleConnection(client: any, ...args: any[]) {
    // Handle connection event

    const dateNow = new Date();
    console.log(
      `Client (${
        client["id"]
      }), connected, at ${dateNow.toLocaleDateString()}, ${dateNow.toLocaleTimeString()}`,
    );
  }

  public handleDisconnect(client: any) {
    // Handle disconnection event

    const dateNow = new Date();
    console.log(
      `Client (${
        client["id"]
      }), disconnected, at ${dateNow.toLocaleDateString()}, ${dateNow.toLocaleTimeString()}`,
    );
  }

  @SubscribeMessage("message")
  public handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    // Handle received message
    this.server.emit("onMessage", data); // Broadcast the message to all connected clients
    console.log(data);
  }
}
