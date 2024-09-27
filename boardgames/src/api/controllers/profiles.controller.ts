import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/domain/user.entity';
import { QueryBus } from '@nestjs/cqrs';
import { DetailsQuery } from 'src/application/Profiles/Details';
import { AuthGuard } from '@nestjs/passport';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly queryBus: QueryBus) {}

  
  @Get('/:username')
  async getProfile(@Param('username') userName: string) {
 
    const result = await this.queryBus.execute(new DetailsQuery(userName));
    if (result.isSuccess) {
      return result.value;
    } else {
      return {
        statusCode: 400,  
        message: result.error,
      };
    }
  }
}