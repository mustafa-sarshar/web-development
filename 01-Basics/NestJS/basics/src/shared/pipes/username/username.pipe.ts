import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class UsernamePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value.username = value.username
      .split("")
      .map((char: string) => char.toUpperCase())
      .join("");
    return value;
  }
}
