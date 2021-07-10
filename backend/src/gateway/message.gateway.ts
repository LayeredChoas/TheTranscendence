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
let connectd_users = [];
let live_games = [];

@WebSocketGateway()
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly userservice: UsersService) {}
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
    client.leave('game');
  }

  @SubscribeMessage('in game')
  add_to_game(client: Socket, payload: any) {
    console.log('user in game: ', payload.data.username);
    if (!client.rooms['game'] && payload.data.username) {
      client.join('game');
      this.userservice.change_status('in_game', payload.data.username);
    }
  }

  @SubscribeMessage('update_game')
  update_game(client: Socket, payload: any) {
    for (let index = 0; index < connectd_users.length; index++) {
      if (
        connectd_users[index].socket.rooms['game'] &&
        payload.data.username != connectd_users[index].name
      ) {
        console.log('sent');
        connectd_users[index].socket.emit('update_game', {
          data: payload.data,
        });
      }
    }
  }

  @SubscribeMessage('update_ball')
  update_ball(client: Socket, payload: any) {
    for (let index = 0; index < connectd_users.length; index++) {
      if (connectd_users[index].socket.rooms['game']) {
        connectd_users[index].socket.emit('update_ball_pos', {
          data: payload.data,
        });
      }
    }
  }

  @SubscribeMessage('rest_game')
  rest_game(client: Socket, payload: any) {
    for (let index = 0; index < connectd_users.length; index++) {
      if (connectd_users[index].socket.rooms['game']) {
        connectd_users[index].socket.emit('rest_game_vals', {
          data: payload.data,
        });
      }
    }
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
          console.log('re user', val);
          this.userservice.change_status('offline', val);
          connectd_users = n_u;
          return 
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
      console.log('re user', val);
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
  }

  @SubscribeMessage('get_game')
  update_click(client: Socket, payload: any) {
    for (let index = 0; index < connectd_users.length; index++) {
      if (connectd_users[index].name == "ayennoui") {
        connectd_users[index].socket.emit('live_feed', {
          data: payload.data,
        });
      }
    }
  }

  @SubscribeMessage('game_feed')
  feed_game(client: Socket, payload: any) {
    for (let index = 0; index < connectd_users.length; index++) {
      if (connectd_users[index].name) {
        connectd_users[index].socket.emit('live_game', {
          data: payload.data,
        });
      }
    }
  }
}
