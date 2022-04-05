import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDTO } from 'src/user/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() body: LoginUserDTO): object {
        return this.authService.authentication(body.username, body.password);
    }

}
