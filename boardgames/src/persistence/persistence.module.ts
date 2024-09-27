import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardGame } from 'src/domain/boardgame.entity';
import { BoardGameOwner } from 'src/domain/boardgameOwner.entity';
import { User } from 'src/domain/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, BoardGame, BoardGameOwner],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, BoardGame, BoardGameOwner]), 
  ],
  exports: [TypeOrmModule],  
})
export class PersistenceModule {}