import type { JWTPayload, JWTVerifyResult, KeyLike, ResolvedKey } from "jose";

export interface Todo {
  date?: number; // Added from server
  sub?: string; // This is the User's Id
  title: string; // Todo from Form
}
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

export class CreateTodoDto {
  title: string;
}

export class ListTodoDto {
  date?: number;
  title: string;
}
