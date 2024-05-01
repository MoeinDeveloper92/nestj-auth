import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { dot } from 'node:test/reporters';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  //nestjs defines the content type automaticaly based on te return respinse from the service
  //POST request "/auth/signin"
  @Post('signin')
  singin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
