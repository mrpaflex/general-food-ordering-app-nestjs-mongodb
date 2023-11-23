import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VendorModule } from './vendor/vendor.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [UserModule, VendorModule, AuthModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
