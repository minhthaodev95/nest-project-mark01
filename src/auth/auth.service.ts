import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/user/user.schema';
import { from } from 'rxjs/internal/observable/from';
import { catchError, map, of } from 'rxjs';
@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { };
    async authentication(email: string, password: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);

        if (!user) {
            return false;
        } else {
            const check = await this.comparePassword(password, user.password);
            if (check) {
                const access_token = this.createToken(user);
                return {
                    access_token,
                    user,
                };
            } else {
                return false;
            }

        }
    }
    
    //function compare password param with user password in database
    async comparePassword(
        password: string,
        storePasswordHash: string,
    ): Promise<any> {
        return await bcrypt.compare(password, storePasswordHash);
    }

    // create token function
    createToken(user: any): string {
        const userPayload = {
            id: user.id,
            role: user.role,
        };
        const access_token = this.jwtService.sign(userPayload);
        return access_token;
    }


}
