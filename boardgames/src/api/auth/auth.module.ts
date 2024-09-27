import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { User } from '../../domain/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),  // Register the User entity for repository access
    JwtModule.registerAsync({
      imports: [ConfigModule],  // Import ConfigModule for accessing environment variables
      inject: [ConfigService],  // Inject ConfigService to retrieve the JWT_SECRET
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),  // Fetch JWT_SECRET from .env or config
        signOptions: { expiresIn: '60m' },  // Set token expiration time
      }),
    }),
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy],  // Register AuthService and JwtStrategy
  exports: [AuthService],  // Export AuthService for use in other modules
})
export class AuthModule {}