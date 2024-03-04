import { Injectable } from "@nestjs/common";
import { Buffer } from "node:buffer";
import internal from "node:stream";
import { SerialPort } from "serialport";

@Injectable()
export class SerialportService {
  private port?: SerialPort;

  constructor() {}

  public async openPort(
    portName: string,
    baudRate: number,
    dataBits: 5 | 6 | 7 | 8,
  ) {
    try {
      this.port = new SerialPort({
        path: portName,
        baudRate: baudRate,
        dataBits: dataBits,
        parity: "none",
        stopBits: 1,
        rtscts: false,
      });

      this.port.on("open", () => {
        console.log("Serial port opened");
      });

      this.port.on("data", (data) => {
        const dateNow = new Date();
        const uint8arr = new Uint8Array(Buffer.from(data, 136));
        const dataDecoded = new TextDecoder().decode(uint8arr);
        console.log(
          "Data received:",
          dateNow.getTime().toString(),
          Buffer.from(data).toString("utf8"),
        );

        this.port.on("end", () => {
          console.log("Data Ended!");
        });

        this.port.on("finish", () => {
          console.log("Data Finished!");
        });

        this.port.on("pause", () => {
          console.log("Data Paused!");
        });

        this.port.on("drain", () => {
          console.log("Data Drained!");
        });

        this.port.on("pipe", (src: internal.Readable) => {
          console.log("Data Piped!", src);
        });

        // this.port.on("readable", () => {
        //   console.log("Data Readable!");
        // });

        this.port.on("resume", () => {
          console.log("Data Resumed!");
        });

        this.port.on("unpipe", (src: internal.Readable) => {
          console.log("Data Unpipe!", src);
        });
      });
    } catch (error) {
      console.error("Error opening serial port:", error);
    }
  }

  public async closePort() {
    if (this.port) {
      await this.port.close();
      this.port = undefined;
      console.log("Serial port closed");
    }
  }

  public async writeData(data: string) {
    if (this.port) {
      await this.port.write(data);
    } else {
      console.error("Serial port is not open");
    }
  }
}
