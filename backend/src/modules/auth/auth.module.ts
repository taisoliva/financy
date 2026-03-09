import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthResolver, AuthService, UsersService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SUA_SECRET',
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
