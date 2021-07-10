import { Injectable } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';
import { UsersService } from 'src/users/users.service';
const { user, match } = new PrismaClient();

@Injectable()
export default class GameService {
  constructor(private readonly userservice: UsersService) {}
  async get_live_games() {
    let ret = [];
    try {
      const val = await match.findMany();
      if (!val)
        return {
          id: -1,
        };
      for (let index = 0; index < val.length; index++) {
        if (val[index].live) {
          ret.push({
            gameId: val[index].gameId,
            p1: await this.userservice.get_user_username(val[index].player1),
            p2: await this.userservice.get_user_username(val[index].player2),
          });
        }
      }
      console.log(ret);
      return {
        id: 1,
        games: ret,
      };
    } catch (error) {
      console.log(error.message);
      return {
        id: -1,
      };
    }
  }

  async get_game_info(gameId) {
    try {
      const m = await match.findFirst({
        where: {
          gameId: gameId,
        },
      });
      if (!m)
        return {
          id: -1,
        };
      let p1 = await this.userservice.get_user_username(m.player1);
      let p2 = await this.userservice.get_user_username(m.player2);
      if (!p1 || !p2)
        return {
          id: -1,
        };
      return {
        id: m.id,
        player1: p1,
        player2: p2,
      };
    } catch (error) {
      console.log(error.message);
      return {
        id: -1,
      };
    }
  }
}
