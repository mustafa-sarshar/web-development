import { Injectable } from "@nestjs/common";
import { SerialPort } from "serialport";
import { Buffer } from "node:buffer";

@Injectable()
export class SerialportService {
  private port?: SerialPort;

  constructor() {}

  async openPort(portName: string, baudRate: number, dataBits: 5 | 6 | 7 | 8) {
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
      });
    } catch (error) {
      console.error("Error opening serial port:", error);
    }
  }

  async closePort() {
    if (this.port) {
      await this.port.close();
      this.port = undefined;
      console.log("Serial port closed");
    }
  }

  writeData(data: string) {
    if (this.port) {
      this.port.write(data);
    } else {
      console.error("Serial port is not open");
    }
  }
}
