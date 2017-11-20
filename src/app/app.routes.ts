// Import our dependencies
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './common/auth.guard';
import { DishComponent } from './dish/dish.component';
import { QuestionComponent } from './question/question.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';

// Define which component should be loaded based on the current URL
export const routes: Routes = [
  { path: 'dish', component: DishComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'question', component: QuestionComponent, canActivate: [AuthGuard] },
  { path: 'list-questions', component: ListQuestionsComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent },
];
