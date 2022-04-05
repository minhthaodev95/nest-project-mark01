import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import { CreateUserDTO } from './create-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private  userModel: Model<UserDocument>) { };
    async create(user: CreateUserDTO): Promise<User> {
        //create a user and save in mongoose
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }
    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }
    // get user by email
    async getUserByEmail(email: string): Promise<User> {
        console.log(email);
        return await this.userModel.findOne({ username: email } );
    }
    
    // findUserByid
    async findUserById(id: string): Promise<User> {
        return await this.userModel.findById(id);
    }

}
