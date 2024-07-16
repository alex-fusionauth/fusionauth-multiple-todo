import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class Todo1Service {
  private readonly todos: Todo[] = [];

  create(todo: Todo) {
    const updateTodo = { ...todo, date: Date.now() };
    this.todos.push(updateTodo);
    return updateTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }
}
