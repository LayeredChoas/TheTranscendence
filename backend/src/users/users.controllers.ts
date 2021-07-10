import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { UsersService } from './users.service';

@Controller()
export default class UsersController {
  constructor(private readonly usersservice: UsersService) {}


  @Post('/create_user')
  create_user(@Body() b)
  {
    return this.usersservice.create_user(b)
  }
  @Post('/login')
  user_login(@Body() b) {
    return this.usersservice.user_login(b);
  }

  @Post('/change_password')
  change_password(@Body() b) {
    return this.usersservice.change_password(b);
  }

  @Post('/upload/:user')
  @UseInterceptors(
    FileInterceptor('myfile', {
      dest: './public/uploads',
    }),
  )
  uploadingfiles(@UploadedFile() file, @Param('user') username) {
    const filename = file.filename;
    return this.usersservice.change_photo({ filename, username });
  }

  @Post('/change_username')
  change_username(@Body() b) {
    return this.usersservice.change_username(b);
  }

  @Delete('/delete_user')
  delete_user(@Body() b) {
    return this.usersservice.delete_user(b.username, b.password);
  }

  @Post('/block/:user')
  block_user(@Param('user') b_user, @Body() b) {
    const username = b.data.username;
    return this.usersservice.block_user(b_user, username);
  }

  @Post('/change_title')
  change_title(@Body() b)
  {
    return this.usersservice.change_title(b.data.user, b.data.title)
  }
}
