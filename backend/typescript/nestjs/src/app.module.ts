import { Module } from '@nestjs/common';
import { Todo1Service } from './todo/todo1.service';
import { Todo1Controller } from './todo/todo1.controller';
import { Todo2Controller } from './todo/todo2.controller';
import { Todo2Service } from './todo/todo2.service';

@Module({
  imports: [],
  controllers: [Todo1Controller, Todo2Controller],
  providers: [Todo1Service, Todo2Service],
})
export class AppModule { }
