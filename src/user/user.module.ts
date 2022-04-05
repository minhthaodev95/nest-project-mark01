import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserSchema} from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema,
    }]),
  ],
  controllers:[UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
