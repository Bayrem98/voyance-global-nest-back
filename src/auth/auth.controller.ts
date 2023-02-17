import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/user/user.interface';
import CreateUserDto from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CurrentUserInterceptor } from './user.interceptor';
import { LoginAuthDto } from './dto/login-auth.dto';
/*import { CurrentUserInterceptor } from './user.interceptor';*/

@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('me')
  async me(@Request() req): Promise<User | undefined> {
    console.log(req.user);
    return this.authService.getMe(req.user);
  }

  @Post('register')
  async register(@Body() newUser: CreateUserDto): Promise<User> {
    return this.authService.register(newUser);
  }

  @Post('login')
  async login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }
}
