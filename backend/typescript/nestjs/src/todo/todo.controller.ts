import { BadRequestException, Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateTodoDto, ListTodoDto } from './todo.dto';
import { TodoService } from './todo.service';
import { Todo } from './interfaces/todo.interface';
import { createRemoteJWKSet, jwtVerify, errors } from 'jose';
import type { JWTVerifyResult, JWTPayload, ResolvedKey, KeyLike } from 'jose';

/* In the below I would recommend using either
* a guard or auth module instead of adding
* auth logic to the controller directly
* I would also not send back the verifiedJWT 
* (even though it can be read in browser
* it cannot be read by JS in browser)
* but for this example it seemed to make sense
* in case we want to show on screen.
*/

export interface Status {
  expiration: boolean | 'fail' | 'success',
  signature: boolean | 'fail' | 'success',
  audience: boolean | 'fail' | 'success',
  sub: boolean | 'fail' | 'success',
}

export interface CreateResponse {
  status: Status,
  verifiedJWT: JWTVerifyResult<JWTPayload> & ResolvedKey<KeyLike> | undefined,
  todo?: Todo,
  message: string,
}

export interface ListResponse {
  status: Status,
  verifiedJWT: JWTVerifyResult<JWTPayload> & ResolvedKey<KeyLike> | undefined,
  todos: ListTodoDto[],
  message: string,
}

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) { }

  @Post()
  async create(@Req() request: Request, @Body() createTodoDto: CreateTodoDto): Promise<CreateResponse> {
    const { status, verifiedJWT, message } = await accessTokenStatus(request);

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
    const { status, verifiedJWT, message } = await accessTokenStatus(request);

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

const accessTokenStatus = async (request: Request) => {
  const clientId = `e9fdb985-8675-4e01-9d73-ac2d60d1dc8b`;

  const appAt = request.cookies['app.at'];
  const status: Status = {
    expiration: 'fail',
    signature: 'fail',
    audience: 'fail',
    sub: 'fail',
  }
  try {
    /*
    * Check if signature is valid before anything
    */

    // Update this URL as needed
    const jwksClient = createRemoteJWKSet(
      new URL(`http://localhost:9011/.well-known/jwks.json`)
    );

    // This is going to check the well known key that was 
    // created during the kickstart process, which you 
    // can find within your application. The 'audience'
    // here is the clientId of your application.

    const verifiedJWT = await jwtVerify(appAt, jwksClient, {
      issuer: `http://localhost:9011`,
      audience: clientId,
    });

    console.debug('JWT Signature Verification', verifiedJWT);
    // If it made it this far signature is good.
    status.signature = 'success';

    /*
    * Check if expired
    */
    status.expiration = new Date(verifiedJWT.payload.exp * 1000).getTime() > Date.now() ? 'success' : 'fail';

    /*
    * Check our clientId against the audience provided in the JWT
    */

    status.audience = clientId === verifiedJWT.payload.aud ? 'success' : 'fail';

    /*
    * You could validate more from this sub
    * like hit a database and pass back user details
    * associated with the user. You can think of 'sub'
    * as the User Id in an external system.
    */

    status.sub = verifiedJWT?.payload?.sub ? 'success' : 'fail';

    return {
      verifiedJWT,
      status,
      message: 'success'
    }

  } catch (e) {
    if (e instanceof errors.JOSEError) {
      console.dir({ error: e.message, code: e.code });
    } else {
      console.dir(`Internal server error: ${e}`);
    }

    return {
      status,
      message: e?.message || 'failure'
    }
  }
}