import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength } from 'class-validator';

export class CreatePageDto {
  @ApiProperty({
    maxLength: 32,
  })
  @IsString()
  @MaxLength(32)
  name: string;

  @ApiProperty({
    maxLength: 32,
    pattern: '^[a-zA-Z0-9_-]+(\\.[a-zA-Z]{2,})+$',
  })
  @IsString()
  @MaxLength(32)
  @Matches(/^[a-zA-Z0-9_-]+(\.[a-zA-Z]{2,})+$/)
  url: string;
}
