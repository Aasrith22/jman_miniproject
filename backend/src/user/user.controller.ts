import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private userservice : UserService){}

    @Post()
    addUser(@Body() createuserdto : CreateUserDto){
        console.log("Adding User - Msg from User's Controller");
        return this.userservice.adduser(createuserdto);
    }

    @Get()
    getUsers(){
        console.log("Getting all user's data - Msg from User's Controller");
        return this.userservice.getusers();
    }

}
