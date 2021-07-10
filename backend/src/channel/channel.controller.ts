import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import ChannelService from "./channel.service";

@Controller()
export default class ChannelController{
    constructor(private readonly channelservice : ChannelService){}

    @Post("/create_channel")
    create_channel(@Body() b)
    {
        return this.channelservice.create_channel(b);
    }

    @Get('/channels')
    get_channels()
    {
        return this.channelservice.get_channels();
    }

    @Post('/get_channel')
    get_channel(@Body() b)
    {
        return this.channelservice.get_channel(b.data)
    }

    @Post('/channel_access')
    channel_access(@Body() b)
    {
        return this.channelservice.channel_access(b.data)
    }

    @Post('/channel_send')
    channel_send(@Body() b)
    {
        return this.channelservice.channel_message(b.data)
    }

    @Post("/channel/mute")
    mute_user(@Body() b)
    {
        return this.channelservice.mute_user(b.data)
    }

    @Post('/channel/ban')
    ban_user(@Body() b)
    {
        return this.channelservice.ban_user(b.data)
    }

    @Post('/channel/banned')
    show_ban(@Body() b)
    {
        return this.channelservice.show_ban_user(b.data)
    }

    @Post('/channel/unban')
    unban_user(@Body() b)
    {
        return this.channelservice.unban_user(b.data)
    }

    @Put('/channel/password')
    change_password(@Body() b)
    {
        return this.channelservice.change_password(b.data);
    }

    @Post('/channel/status')
    change_status(@Body() b)
    {
        return this.channelservice.channel_status(b.data)
    }

    @Post('/channel/admin')
    add_admin(@Body()  b)
    {
        return this.channelservice.add_admin(b.data);
    }

    @Post('/channel/leave')
    leave_channel(@Body() b)
    {
        return this.channelservice.leave_channel(b.data)
    }

    @Delete('/channel/delete')
    delete_channel(@Body() b)
    {
        return this.channelservice.delete_channel(b)
    }
}