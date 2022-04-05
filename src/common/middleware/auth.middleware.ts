import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log("Auth Middleware connected !");
        next();
    }
    
}