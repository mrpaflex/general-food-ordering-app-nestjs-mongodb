import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VendorModule } from './vendor/vendor.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService)=>({
        uri: configService.get('MONGODB_URI')
      }),
      inject: [ConfigService]
    }),
    UserModule, VendorModule, AuthModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}