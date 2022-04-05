import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {
    getCourses(): object {
        return {
            "users": [
                {
                    "id": 1,
                    "name": "John",
                    "age": 30
                },
                {
                    "id": 2,
                    "name": "Jim",
                    "age": 25
                },
                {
                    "id": 3,
                    "name": "Jack",
                    "age": 27
                }
            ]
        };
    }
    //create course
    createCourse(body: object): object {
        return {
            "id": 4,
            "name": body['name'],
            "age": body['age']
        };
    }
}


//genarate a json user

