import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: '2m'}
      }),
      inject: [ConfigService],//note here must always be [ConfigService] not [ConfigModule]
    }), 
   
  ],
  controllers: [AuthController],
  providers: [AuthService]
  //note
  //any tme you see this error secretorprivatekey must have a value
  //it is cause by the importig JwtService in the provider. remove it becuse JwtModule inport has taken care of everything concerning jwtservice in the authModule
})
export class AuthModule {}
