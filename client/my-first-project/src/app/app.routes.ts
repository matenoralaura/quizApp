import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { adminGuard } from './admin.guard';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'signup', loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent)},
    { path: 'user-management', loadComponent: () => import('./user-management/user-management.component').then((c) => c.UserManagementComponent), canActivate: [authGuard] },
    { path: 'quizzes', children: [
        { path: '', loadComponent: () => import('./list-quizzes/list-quizzes.component').then((c) => c.ListQuizzesComponent), canActivate: [authGuard]},
        { path: ':id', loadComponent: () => import('./quiz/quiz.component').then((c) => c.QuizComponent), canActivate: [authGuard]},
    ] },
    { path: 'new-quiz', loadComponent: () => import('./new-quiz/new-quiz.component').then((c) => c.NewQuizComponent), canActivate: [authGuard, adminGuard] },
    { path: '**', redirectTo: 'quizzes' }
];
