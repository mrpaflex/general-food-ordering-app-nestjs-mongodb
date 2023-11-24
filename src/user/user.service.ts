import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { HashedPassword } from 'src/auth/hashedPassword/password.hash';
import { LoginUserDto } from './dto/login.user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name)
    private userModel: Model<User>
    ){}
   async createuser(input: CreateUserDto) {
    //console.log(input)

    const user = await this.userModel.findOne({
        userName: input.userName
        })
      if (user) {
        throw new HttpException('user with such username already exist', HttpStatus.UNPROCESSABLE_ENTITY)
      }

      input.password = await HashedPassword(input.password)
     const createUser = await this.userModel.create({
        ...input
      })
     return  await createUser.save()
      
    }


    async loginUser(input: LoginUserDto){
      const user = await this.userModel.findOne({
        userName: input.userName
      })
      return user
    }
}
