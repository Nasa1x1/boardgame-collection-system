import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { BaseApiController } from './baseApi.controller';
import { Result } from 'src/application/Core/result';
import { UserDto } from '../Dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../auth/public.decorator';

@Controller('account')
export class AccountController extends BaseApiController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto): Promise<any> {
    const result: Result<UserDto> = await this.authService.register(registerDto);
    return this.HandleResult(result); 
  }
 
  @Public()
  @Post('login')
  async login(@Body() loginDto): Promise<any> {
    const result: Result<UserDto> = await this.authService.login(loginDto);
    return this.HandleResult(result);  
  }

  @Get()
  async getCurrentUser(@Req() req: Request): Promise<any> {
    const user = (req as any).user;
    const result: Result<UserDto> = await this.authService.getCurrentUser(user);
    return this.HandleResult(result); 
  }
}