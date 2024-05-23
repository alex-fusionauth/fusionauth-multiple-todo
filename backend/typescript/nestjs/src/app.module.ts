import { Module } from '@nestjs/common';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}
