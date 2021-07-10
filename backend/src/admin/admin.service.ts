import { Injectable } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';
import { UsersService } from 'src/users/users.service';

const { user, friendship } = new PrismaClient();
@Injectable()
export default class AdminService {
    constructor(private readonly userservice : UsersService){}
  async send_message(b) {
    console.log(b);
    try {
      const u = await user.findUnique({
        where: {
          username: b.username,
        },
      });
      const n_u = await user.findUnique({
        where: {
          username: b.user,
        },
      });
      if (!n_u || !u)
        return {
          id: -1,
        };
      const f = await friendship.create({
        data: {
          user1: u.id,
          user2: n_u.id,
          status: true,
        },
      });
      if (!f)
        return {
          id: 1,
          message: 'friend',
        };
      // for (let index = 0; index < u.friends.length; index++) {
      //     if (u.friends[index] == n_u.id)
      //         return {
      //             id: u.id
      //         }
      // }
      let u_val = u.friends;
      let n_u_val = n_u.friends;

      u_val.push(f.id);
      n_u_val.push(f.id);
      const ret = await user.update({
        where: {
          id: u.id,
        },
        data: {
          friends: u_val,
        },
      });

      const ret1 = await user.update({
        where: {
          id: n_u.id,
        },
        data: {
          friends: n_u_val,
        },
      });
      if (!ret || !ret1)
        return {
          id: -1,
        };
      return {
        id: ret1.id,
      };
    } catch (error) {
      console.log(error.message);
      return {
        id: -1,
        message: error.message,
      };
    }
  }

  async remove_user(b) {
      try {
          const val = await user.delete({
              where:{
                  username:b.username
              }
          })
          if (!val)
            return {
                id: -1
            }
        return {
            id: val.id
        }
      } catch (error) {
          console.log(error.message)
          return {
              id: -1
          }
      }
  }
}
