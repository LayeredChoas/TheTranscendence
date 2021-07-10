import { Controller, Get, Param } from "@nestjs/common";
import GameService from "./game.service";



@Controller()
export default class GameController
{
    constructor(private readonly gameservice : GameService){}

    @Get('/live_game')
    get_live_games()
    {
        return this.gameservice.get_live_games();
    }

    @Get('/game/:id')
    get_game_info(@Param('id') gameId)
    {
        return this.gameservice.get_game_info(gameId)
    }
}