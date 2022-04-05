import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {

    return 'Hello World!';
  }
  getBello(): string {
    return 'Bello World!';
  }

  // a function with a parameter name return name for client
  getHelloWithName(name: string): string {
    return `Hello ${name}`;
  }
  login(username: string, password: string): string {
    return `${username} ${password}`;
  }

}
