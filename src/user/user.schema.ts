import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/guard/roles.enum';
export type UserDocument = User & Document;

@Schema()
export class User {
    id?: string;
    @Prop({ required: true })
    username: string;
    
    @Prop({ required: true })
    age: number;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enums: ['admin', 'shop', 'guest'], default: 'guest' })
    role: Role[];
    @Prop({ required: true, default: new Date() })
    createdAt: Date;
    @Prop()
    deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

//pre save hash password field
UserSchema.pre('save', async function (next) {
    const user = this as UserDocument;
    if (user.isModified('password')) {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
    }
    next();
});

//compare password
UserSchema.methods.comparePassword = async function (password: string) {
    const user = this as UserDocument;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
}

