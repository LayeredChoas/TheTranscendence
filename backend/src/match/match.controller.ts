import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import MatchService from './match.service';

@Controller()
export default class MatchController {
  constructor(private readonly matchservice: MatchService) {}

  @Get('/match/:user')
  get_user_matches(@Param('user') user) {
    return this.matchservice.get_user_matches(user);
  }

  @Post('/create_match')
  create_match(@Body() b)
  {
    return this.matchservice.create_match(b);
  }

  @Post('/match/random')
  random_match(@Body() b)
  {
    return this.matchservice.random_match(b.data)
  }
}
