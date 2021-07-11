import { Socket } from 'socket.io';
import { Logger, Param } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayDisconnect,
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'http';
import { UsersService } from 'src/users/users.service';
import GameService from 'src/game/game.service';
let connectd_users = [];
let live_games = [];

@WebSocketGateway()
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly userservice: UsersService,
    private readonly gameservice: GameService,
  ) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('init_user')
  init_user(client: Socket, payload: any) {
    console.log('Init User');
    connectd_users.push({ name: payload.data.username, socket: client });
    this.userservice.change_status('online', payload.data.username);
  }

  @SubscribeMessage('leave game')
  leave_game(client: Socket, payload: any) {
    console.log('user left game: ', payload.data.username);
    // this.userservice.change_status('online', payload.data.username);
    client.leave(payload.data.gameId);
  }

  @SubscribeMessage('in game')
  add_to_game(client: Socket, payload: any) {
    console.log(
      'user in gameId: ',
      payload.data.gameId,
      '',
      payload.data.username,
    );
    if (!client.rooms[payload.data.gameId] && payload.data.username) {
      client.join(payload.data.gameId);
      this.userservice.change_status('in_game', payload.data.username);
      console.log(payload.data.username, ' Joined ', payload.data.gameId);
    }
  }

  @SubscribeMessage('update_game')
  update_game(client: Socket, payload: any) {
    console.log(payload);
    for (let index = 0; index < connectd_users.length; index++) {
      if (
        connectd_users[index].socket.rooms[payload.data.gameId] &&
        payload.data.username != connectd_users[index].name
      ) {
        connectd_users[index].socket.emit('update_game', {
          data: payload.data,
        });
      }
    }
  }

  @SubscribeMessage('update_ball')
  update_ball(client: Socket, payload: any) {
    for (let index = 0; index < connectd_users.length; index++) {
      if (connectd_users[index].socket.rooms[payload.data.gameId]) {
        connectd_users[index].socket.emit('update_ball_pos', {
          data: payload.data,
        });
      }
    }
  }

  @SubscribeMessage('rest_game')
  rest_game(client: Socket, payload: any) {
    let ret = payload;

    for (let index = 0; index < live_games.length; index++) {
      if (live_games[index].gameId == payload.data.gameId) {
        if (live_games[index].player1.score > payload.data.players[0]._score)
          ret.data.players[0]._score = live_games[index].player1.score;
        else live_games[index].player1.score = payload.data.players[0]._score;

        if (live_games[index].player2.score > payload.data.players[1]._score)
          ret.data.players[1]._score = live_games[index].player2.score;
        else live_games[index].player2.score = payload.data.players[1]._score;

        if (live_games[index].gamesnum > payload.data.gamesnum)
          ret.data.gamesnum = live_games[index].gamesnum;
        else live_games[index].gamesnum = payload.data.gamesnum;

        if (
          ret.data.players[0]._score + ret.data.players[1]._score >
          ret.data.gamesnum
        )
          ret.data.gamesnum =
            ret.data.players[0]._score + ret.data.players[1]._score;
        if (ret.data.gamesnum >= live_games[index].rounds) this.GameOver(index);
      }
    }
    for (let index = 0; index < connectd_users.length; index++) {
      if (connectd_users[index].socket.rooms[payload.data.gameId]) {
        console.log('Emitting rest to: ', connectd_users[index].name);
        connectd_users[index].socket.emit('rest_game_vals', {
          data: ret.data,
        });
      }
    }

    console.log('reseting game', ret.data);
    console.log('saved game', live_games);
  }

  @SubscribeMessage('joinRoom')
  public joinRoom(client: Socket, room: string): void {
    if (!client.rooms[room]) client.join(room);
  }

  @SubscribeMessage('leaveRoom')
  public leaveRoom(client: Socket, room: string): void {
    client.leave(room);
  }

  send_message(user) {
    for (let index = 0; index < connectd_users.length; index++) {
      if (connectd_users[index].name == user)
        connectd_users[index].socket.emit('recived', 'value');
    }
  }

  send_to_room(room, username) {
    for (let index = 0; index < connectd_users.length; index++) {
      if (
        connectd_users[index].socket.rooms[room] &&
        connectd_users[index].name != username
      ) {
        console.log('user found: ', connectd_users[index].name);
        connectd_users[index].socket.emit('recived_channel', room);
      }
    }
  }
  public afterInit(server: Server): void {
    // console.log('Init');
    // return this.logger.log('Init');
  }

  public handleDisconnect(client: Socket): void {
    console.log('Disconnect');
    let val = '';
    let count = 0;
    let n_u = connectd_users;
    for (let i = 0; i < connectd_users.length; i++) {
      if (connectd_users[i].socket == client) {
        val = connectd_users[i].name;
        n_u.splice(i, 1);
        if (n_u.length <= 0) {
          this.userservice.change_status('offline', val);
          connectd_users = n_u;
          return;
        }
        for (let index = 0; index < n_u.length; index++) {
          if (n_u[index].name == val) {
            count++;
            break;
          }
        }
        break;
      }
    }
    if (count == 0) {
      this.userservice.change_status('offline', val);
    }
    connectd_users = n_u;
  }

  public handleConnection(client: Socket): void {
    // return this.logger.log(`Client connected: ${client.id}`);
  }

  //// Handle Game Reqs
  @SubscribeMessage('challenge')
  challenge(client: Socket, payload: any) {
    for (let index = 0; index < connectd_users.length; index++) {
      if (connectd_users[index].name == payload.data.player2) {
        connectd_users[index].socket.emit('challenge', {
          data: payload.data,
        });
      }
    }
  }

  @SubscribeMessage('accept_game')
  accept_game(client: Socket, payload: any) {
    for (let index = 0; index < connectd_users.length; index++) {
      if (connectd_users[index].name == payload.data.player1) {
        connectd_users[index].socket.emit('accept_game', {
          data: payload.data,
        });
      }
    }
    live_games.push({
      gameId: payload.data.gameId,
      player1: {
        name: payload.data.player1,
        score: 0,
        size: 0,
        power: 1,
      },
      player2: {
        name: payload.data.player2,
        score: 0,
        size: 0,
        power: 1,
      },
      rounds: payload.data.rounds,
    });
  }
  @SubscribeMessage('get_game')
  update_click(client: Socket, payload: any) {
    for (let index = 0; index < connectd_users.length; index++) {
      if (
        connectd_users[index].socket.rooms[payload.data.gameId] &&
        connectd_users[index].socket != client
      ) {
        connectd_users[index].socket.emit('live_feed', {
          data: payload.data,
        });
      }
    }
  }

  @SubscribeMessage('game_feed')
  feed_game(client: Socket, payload: any) {
    for (let index = 0; index < connectd_users.length; index++) {
      if (
        connectd_users[index].socket.rooms[payload.data.gameId] &&
        connectd_users[index].socket != client
      ) {
        connectd_users[index].socket.emit('live_game', {
          data: payload.data,
        });
      }
    }
  }

  GameOver(game) {
    const g = live_games[game];
    live_games.splice(game, 1);
    return this.gameservice.game_end(g);
  }

  @SubscribeMessage('power_ups')
  game_powerups(client: Socket, payload: any) {
    let ret = payload;
    console.log(payload)
    for (let index = 0; index < live_games.length; index++) {
      if (payload.data.gameId == live_games[index].gameId) {
        // if (live_games[index].player1.size > payload.data.players[0].size.y)
        live_games[index].player1.size = payload.data.players[0].size.y;
        live_games[index].player2.size = payload.data.players[1].size.y;

        live_games[index].player1.power = payload.data.players[0]._hit_power;
        live_games[index].player2.power = payload.data.players[1]._hit_power;
        ret = live_games[index]
        return;
      }
    }

    for (let index = 0; index < connectd_users.length; index++) {
      if (connectd_users[index].socket.rooms[payload.data.gameId]) {
        connectd_users[index].socket.emit('update_powers', {
          data: payload.data,
        });
      }
    }
  }
}
