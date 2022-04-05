import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/guard/roles.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    CoursesModule,
    UserModule,
  ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
  }),
  UserModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    ProductModule,
    AuthModule,
  ],
  
  controllers: [AppController],
  providers: [AppService, ProductService,],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('courses');
  }
}
