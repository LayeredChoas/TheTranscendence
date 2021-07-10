import { Body, Controller, Delete, Post } from "@nestjs/common";
import AdminService from "./admin.service";

@Controller()
export default class AdminController{
    constructor(private readonly adminservice : AdminService){}


    @Post('/admin/send_message')
    send_message(@Body() b)
    {
        return this.adminservice.send_message(b.data)
    }

    @Delete('/admin/remove_user')
    remove_user(@Body() b)
    {
        return this.adminservice.remove_user(b)
    }
}