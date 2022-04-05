import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RolesGuard } from './guard/roles.guard';
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  
  ],
  providers: [AuthService, JwtStrategy, RolesGuard],
  controllers: [AuthController]
})
export class AuthModule {}
