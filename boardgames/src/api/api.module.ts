import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { BoardGameController } from './controllers/boardgames.controller';
import { ProfilesController } from './controllers/profiles.controller';
import { GetBoardGamesHandler } from 'src/application/boardGames/list';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardGame } from 'src/domain/boardgame.entity';
import { GetBoardGameHandler } from 'src/application/boardGames/details';
import { CreateBoardGameHandler } from 'src/application/boardGames/create';
import { EditBoardGameHandler } from 'src/application/boardGames/edit';
import {DeleteBoardGameHandler } from 'src/application/boardGames/delete';
import { UpdateOwningHandler } from 'src/application/boardGames/updateowning';
import { AuthModule } from './auth/auth.module';
import { DetailsQueryHandler } from 'src/application/Profiles/Details';
import { User } from 'src/domain/user.entity';
import { BoardGameOwner } from 'src/domain/boardgameOwner.entity';
import { RolesGuard } from './auth/roles/role.guard';

@Module({
  imports: [CqrsModule,AuthModule, TypeOrmModule.forFeature([BoardGame, User, BoardGameOwner])],
  controllers: [AccountController,BoardGameController,ProfilesController], 
  providers: [GetBoardGamesHandler,GetBoardGameHandler,CreateBoardGameHandler, EditBoardGameHandler,DeleteBoardGameHandler, UpdateOwningHandler, DetailsQueryHandler,RolesGuard ],
  
})
export class ApiModule {}