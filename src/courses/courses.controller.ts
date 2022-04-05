import { Controller, Get, Post, Param, Body, Put, Patch, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {

    constructor(private readonly coursesService: CoursesService) { }
    @Get()
    getCourses() {
        return this.coursesService.getCourses();
    }
    @Post()
    createCourse(@Body() body) {
        return this.coursesService.createCourse(body);
    }

    @Post("/avatar")
    @UseInterceptors(FilesInterceptor('image', 20, {
        storage: diskStorage({
          destination: './files',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${file.originalname}`);
            }
        }),
        fileFilter: (req, file, cb) => {
            const isPhoto = file.mimetype.startsWith('image/');
            if (isPhoto) {
                cb(null, true);
            } else {
                cb(new Error('Only images are allowed!'), false);
            }
        }
      }),)
    createAvatar(@UploadedFile() file: Express.Multer.File) {
        return file;
    }
}


