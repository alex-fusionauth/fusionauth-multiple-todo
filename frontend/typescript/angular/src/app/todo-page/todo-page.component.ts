import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Observable, lastValueFrom, takeLast } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Todo {
  id?: string;
  todo: string;
}

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    AsyncPipe,
    DatePipe,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css',
})
export class TodoPageComponent implements OnInit {
  constructor(private http: HttpClient) {}

  displayedColumns: string[] = ['date', 'todo'];
  todos$!: Observable<Todo[]>;

  todoForm = new FormGroup({
    todo: new FormControl('', { updateOn: 'submit' }),
  });

  ngOnInit(): void {
    this.getTodos();
  }

  async getTodos() {
    this.todos$ = this.http.get<Todo[]>('http://localhost:3000/todo');
  }

  async addTodo() {
    const todo = await lastValueFrom(
      this.http
        .post('http://localhost:3000/todo', { todo: this.todoForm.value.todo })
        .pipe(takeLast(1)),
    );
    this.todoForm.reset();
    this.getTodos();
  }
}
