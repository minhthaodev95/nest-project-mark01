import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
            ignoreExpired: false
        });
    }

    // validate paypoad
    async validate(payload: any) {
        return {
            id: payload.id,
            role: payload.role
        };
    }
}
