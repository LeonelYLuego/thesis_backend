import { ApiProperty } from '@nestjs/swagger';

export class ResponseAcceptDto {
  @ApiProperty()
  value: string;
}
