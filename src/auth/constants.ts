import { ApiProperty } from '@nestjs/swagger';

export const jwtConstants = {
  secret: 'secretKey',
};

export const ROLE_KEY = 'role';

export class LoginCredential {
  @ApiProperty({
    type: 'string',
    example: 'superadmin',
  })
  username: string;

  @ApiProperty({
    type: 'string',
    example: 'password',
  })
  password: string;
}
