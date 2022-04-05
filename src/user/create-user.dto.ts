import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDTO {
     @IsEmail() @IsNotEmpty()
     username: string;
     @IsString() @IsNotEmpty()
     age: number;
     @IsString() @IsNotEmpty()
     password: string;
}