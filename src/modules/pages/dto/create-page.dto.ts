import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, MaxLength } from 'class-validator';

export class CreatePageDto {
  @ApiProperty({
    maxLength: 32,
  })
  @IsString()
  @MaxLength(32)
  name: string;

  @ApiProperty({
    maxLength: 32,
    pattern:
      '^[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$',
  })
  @IsString()
  @MaxLength(32)
  @IsUrl()
  url: string;
}
