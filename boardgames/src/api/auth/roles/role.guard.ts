import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { User } from 'src/domain/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
      private reflector: Reflector,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>, // Inject User repository
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const userId = (request as any).user.id;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
        return false;  
      }
  
      return user.roles.some((role: string) => roles.includes(role));

  }
}