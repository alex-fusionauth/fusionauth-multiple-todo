import { BadRequestException, Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Todo1Service } from './todo1.service';
import { CreateResponse, CreateTodoDto, ListResponse } from './interfaces/todo.interface';
import { accessTokenStatus } from 'src/lib/auth';
import { Request } from 'express';

/* In the below I would recommend using either
* a guard or auth module instead of adding
* auth logic to the controller directly
* I would also not send back the verifiedJWT 
* (even though it can be read in browser
* it cannot be read by JS in browser)
* but for this example it seemed to make sense
* in case we want to show on screen.
*/

const clientId = `e9fdb985-9173-4e01-9d73-ac2d60d1dc8a`; // TODO_1

@Controller('todo1')
export class Todo1Controller {
  constructor(private todoService: Todo1Service) { }

  @Post()
  async create(@Req() request: Request, @Body() createTodoDto: CreateTodoDto): Promise<CreateResponse> {
    const { status, verifiedJWT, message } = await accessTokenStatus(request, clientId);

    if (!verifiedJWT) {
      throw new BadRequestException({
        status,
        verifiedJWT,
        message,
      })
    }

    const todo = this.todoService.create({ ...createTodoDto, sub: verifiedJWT?.payload?.sub });
    return {
      status,
      verifiedJWT,
      todo,
      message,
    }
  }
  @Get()
  async findAll(@Req() request: Request,): Promise<ListResponse> {
    const { status, verifiedJWT, message } = await accessTokenStatus(request, clientId);

    if (!verifiedJWT) {
      throw new BadRequestException({
        status,
        verifiedJWT,
        message,
      })
    }

    return {
      status,
      verifiedJWT,
      todos: this.todoService
        .findAll()
        .filter(t => t.sub === verifiedJWT?.payload?.sub)
        .sort((a, b) => b.date - a.date),
      message,
    }
  }
}
