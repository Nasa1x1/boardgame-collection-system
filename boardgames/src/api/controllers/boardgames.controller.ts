import { Controller, Get, Param, Post, Put, Delete, Body, UseGuards, Req } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetBoardGamesQuery } from 'src/application/boardGames/list';
import { GetBoardGameQuery } from 'src/application/boardGames/details';
import { CreateBoardGameCommand } from 'src/application/boardGames/create';
import { BaseApiController } from './baseApi.controller';
import { BoardGame } from 'src/domain/boardGame.entity';
import { EditBoardGameCommand } from 'src/application/boardGames/edit';
import { DeleteBoardGameCommand } from 'src/application/boardGames/delete';
import { UpdateOwningCommand } from 'src/application/boardGames/updateowning';
import { RolesGuard } from '../auth/roles/role.guard';
import { Roles } from '../auth/roles/role.decorator';


@Controller('boardgames')
export class BoardGameController extends BaseApiController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {
    super();
  }

  // Akcja odpowiedzialna za pobranie listy wszystkich gier planszowych
  @Get()
  async findAll() {
    return this.HandleResult(await this.queryBus.execute(new GetBoardGamesQuery()));
  }

  // Akcja odpowidzeialna za pobranie szczegółów pojedynczej gry na podstawie jej ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.HandleResult(await this.queryBus.execute(new GetBoardGameQuery(id)));
  }

  // Akcja do tworzenia nowej gry, dostępna tylko dla użytkowników z rolą "Admin"
  @Post()
  @UseGuards(RolesGuard) 
  @Roles('admin') 
  async create(@Body() boardGame: BoardGame) {
    return this.HandleResult(await this.commandBus.execute(new CreateBoardGameCommand(boardGame)));
  }

  // Akcja do edytowania gry, dostępna tylko dla użytkowników z rolą "Admin"
  @Post()
  @Put(':id')
  @UseGuards(RolesGuard) 
  @Roles('admin') 
  async edit(@Param('id') id: string, @Body() boardGame: BoardGame) {
    boardGame.id=id;
    return this.HandleResult(await this.commandBus.execute(new EditBoardGameCommand(boardGame,id)));
  }
  
  // Akcja do usuwania gry, dostępna tylko dla użytkowników z rolą "Admin"
  @Delete(':id')
  @UseGuards(RolesGuard) 
  @Roles('admin') 
  async delete(@Param('id') id: string) {
    return this.HandleResult(await this.commandBus.execute(new DeleteBoardGameCommand(id)));
  }
  
  // Akcja do dodawnia lub usuwania gry z kolekcji przez zalogowanego użytkownika
  @Post(':id/own')
  async own(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.id;
    return this.HandleResult(await this.commandBus.execute(new UpdateOwningCommand(id,userId )));
  }
 
}