import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodoService {
  private readonly todos: Todo[] = [];

  create(todo: Todo) {
    this.todos.push({ ...todo, date: Date.now() });
  }

  findAll(): Todo[] {
    return this.todos;
  }
}
