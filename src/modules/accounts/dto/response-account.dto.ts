import { ApiProperty } from '@nestjs/swagger';

export class ResponseAccountDto {
  @ApiProperty({
    pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
  })
  id: string;

  @ApiProperty({
    pattern: '^[a-z.]*$',
    maxLength: 32
  })
  username: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({
    pattern: '^\\d{10}$',
  })
  phone: string;
}
