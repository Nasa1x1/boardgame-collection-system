import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../domain/user.entity';  // Adjust path based on your structure
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Result } from 'src/application/Core/result';
import { UserDto } from '../Dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto): Promise<Result<UserDto>> {
    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      registerDto.password = hashedPassword;
      const user = await this.userRepository.save(registerDto);

      const userDto = await this.createUserObject(user);
      return Result.success(userDto);
    } catch (error) {
      return Result.failure('Registration failed');
    }
  }

  async login(loginDto): Promise<Result<UserDto>> {
    try {
      const user = await this.userRepository.findOneBy({ email: loginDto.email });
      if (!user) {
        return Result.failure('User not found');
      }
      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
      if (!isPasswordValid) {
        return Result.failure('Invalid credentials');
      }

      const userDto = await this.createUserObject(user);
      return Result.success(userDto);
    } catch (error) {
      return Result.failure('Login failed');
    }
  }
  async getCurrentUser(user): Promise<Result<UserDto>> {
    if (!user) {
      return Result.failure('User not found');
    }
    const current = await this.userRepository.findOneBy({ id: user.id });
    const userDto = await this.createUserObject(current);
    
    return Result.success(userDto);
  }
  
  private async createUserObject(user: User): Promise<UserDto> {
    const payload = { userName: user.userName, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      displayName: user.displayName,
      token: token,
      userName: user.userName,
      roles: user.roles
    };
  }
}