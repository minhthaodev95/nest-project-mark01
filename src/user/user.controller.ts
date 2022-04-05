import { Controller, Post, Get, Body} from '@nestjs/common';
import { CreateUserDTO } from './create-user.dto';
import { LoginUserDTO } from './login-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    
    @Post('register')
    create(@Body() user: CreateUserDTO): object {
        return this.userService.create(user);
    }
    
    @Get()
    findAll(): object {
        console.log('find all user');
        return this.userService.findAll();
    }



}
