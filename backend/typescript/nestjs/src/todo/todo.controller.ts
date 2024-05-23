import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateTodoDto, ListTodoDto } from './todo.dto';
import { TodoService } from './todo.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('todo')
@UseGuards(AuthGuard) //This is what checks the JWT details
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }
  @Get()
  findAll(): ListTodoDto[] {
    return this.todoService.findAll().sort((a, b) => b.date - a.date);
  }
}
