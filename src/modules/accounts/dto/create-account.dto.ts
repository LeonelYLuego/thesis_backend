import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    description: 'Lowercase letters and points',
    maxLength: 32,
    pattern: '^[a-z.]*$',
  })
  @IsString()
  @MaxLength(32)
  @Matches(/^[a-z.]*$/, { message: 'Lowercase letters and points' })
  username: string;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  lastName: string;

  @ApiProperty({
    description:
      'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and not special characters',
    maxLength: 64,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$',
  })
  @IsString()
  @MaxLength(64)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and not special characters',
  })
  password: string;

  @ApiProperty({
    minLength: 10,
    maxLength: 10,
    pattern: '^\\d{10}$',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @Matches(/^\d{10}$/)
  phone: string;
}
