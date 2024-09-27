import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { User } from '../domain/user.entity';
import { BoardGame } from '../domain/boardgame.entity';
import { BoardGameOwner } from 'src/domain/boardgameOwner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BoardGame,BoardGameOwner])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}