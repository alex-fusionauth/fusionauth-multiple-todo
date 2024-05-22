import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home-page/home-page.component').then(
        (m) => m.HomePageComponent,
      ),
    canActivate: [authGuard(false, '/todo')],
  },
  {
    path: 'todo',
    loadComponent: () =>
      import('./todo-page/todo-page.component').then(
        (m) => m.TodoPageComponent,
      ),
    canActivate: [authGuard(true, '/')],
  },
];
