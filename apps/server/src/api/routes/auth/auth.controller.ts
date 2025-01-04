import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDto,
  LoginSchema,
  RegisterDto,
  RegisterSchema,
  WorkLoginDto,
  WorkLoginSchema,
} from './dto';
import { ResponseInterceptor } from 'src/api/interceptors';
import { ZodValidationPipe } from 'src/pipes';
import { AuthGuard } from 'src/api/guards';

@Controller('auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('/login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('/workLogin')
  @UsePipes(new ZodValidationPipe(WorkLoginSchema))
  async workLogin(@Body() body: WorkLoginDto) {
    return this.authService.workLogin(body);
  }

  @Get('/session')
  @UseGuards(AuthGuard)
  async session(@Req() req) {
    const user = req.user;
    return this.authService.checkUserSession(user);
  }
}
