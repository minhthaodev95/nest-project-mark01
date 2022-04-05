import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class LoginUserDTO {
     @IsEmail() @IsNotEmpty()
     username: string;
     @IsString() @IsNotEmpty()
     password: string;
}