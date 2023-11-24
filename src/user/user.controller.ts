import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.create.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('createuser')
    async createUser(@Body() input: CreateUserDto){
        return await this.userService.createuser(input)
    }
}
