import { Injectable } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';

const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const { user } = new PrismaClient();

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  /* Create User */
  // async CreateUser(b) {
  //   const { username, password } = b;

  //   const newPass = await bcrypt.hash(password, 10);
  //   try {
  //     const val = await user.create({
  //       data: {
  //         username,
  //         password: newPass,
  //       },
  //     });
  //     const token = await JWT.sign({ username }, 'P2021', {
  //       expiresIn: 30000,
  //     });
  //     return {
  //       id: val.id,
  //       username: username,
  //       token: token,
  //     };
  //   } catch (error) {
  //     return { id: -1 };
  //   }
  // }

  // /* Read User */
  // async UserLogin(b) {
  //   try {
  //     const u = await user.findUnique({
  //       where: {
  //         username: b.username,
  //       },
  //     });
  //     console.log(u);
  //     if (!u) return null;
  //     const val = await bcrypt.compare(b.password, u.password);
  //     if (!val) return null;
  //     return u.username;
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // }

  // async UpdateUser(b) {
  //   try {
  //     const username = await user.findUnique({
  //       where: {
  //         username: b.updateusername,
  //       },
  //     });
  //     if (username) return null;
  //     const updatename = await user.update({
  //       where: {
  //         username: b.username,
  //       },
  //       data: {
  //         username: b.updateusername,
  //       },
  //     });
  //     if (!updatename) return null;
  //     else return updatename;
  //   } catch (error) {
  //     return null;
  //   }
  // }

  // async DeleteUser(b) {
  //   const { username } = b;
  //   try {
  //     const name = await user.findUnique({
  //       where: {
  //         username,
  //       },
  //     });
  //     if (!name) return null;
  //     const deleteuser = await user.delete({
  //       where: {
  //         username,
  //       },
  //     });
  //     if (!deleteuser) return null;
  //     else return deleteuser;
  //   } catch (error) {
  //     return null;
  //   }
  // }
}
