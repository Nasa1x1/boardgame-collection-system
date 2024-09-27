import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ApplicationModule } from './application/application.module';
import { PersistenceModule } from './persistence/persistence.module';
import { SeedModule } from './persistence/seed.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './api/auth/jwt-auth.guard';

@Module({
  imports: [ApiModule, ApplicationModule, AuthModule,PersistenceModule,SeedModule,ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,  // Ustawienie globalnego JwtAuthGuard
    },
  ],
})
export class AppModule {}
