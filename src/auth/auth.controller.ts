import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { jwtDecode } from 'jwt-decode';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginCredential } from './constants';
import { UserService } from 'src/user/user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginCredential,
  })
  @Post('login')
  async login(@Body() body: LoginCredential) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  getProfile(@Headers() headers: any) {
    const decode = jwtDecode<any>(headers.authorization);
    return this.userService.findOneByUsername(decode.username);
  }
}
