import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { Roles } from './auth/guard/roles.decorator';
import { Role } from './auth/guard/roles.enum';
import { RolesGuard } from './auth/guard/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getBello();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/hello')
  getHello2(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/hello/:name')
  getHelloWithNam( @Param() params): string {
    return this.appService.getHelloWithName(params.name);
  }
  @Post('/login')
  login(@Body() body): string {
    return this.appService.login(body.username, body.password);
  }


}
