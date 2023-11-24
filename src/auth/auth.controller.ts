import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dto/login.user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('loginuser')
    async loginuser(@Body() input: LoginUserDto){
        return await this.authService.loginuser(input)
    }

}
