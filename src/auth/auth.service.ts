import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/login.user.dto';
import { UserService } from 'src/user/user.service';
import { comparedPassword } from './hashedPassword/password.hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService
        ){}
   async loginuser(input: LoginUserDto) {
        const user = await this.userService.loginUser(input)

        if (!user) {
            throw new HttpException('account does not exist', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if (user.deleted === true) {
            throw new HttpException('account error, try again or contact support', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if (await comparedPassword(input.password, user.password) === false) {
            throw new HttpException('check your password and email', HttpStatus.UNPROCESSABLE_ENTITY)
    
        }

       const payload={
        user: user._id
       }
       
       return{
        accessToken: await this.jwtService.signAsync(payload)
       }
    }
}
