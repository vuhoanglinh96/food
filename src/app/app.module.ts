import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { MetaModule } from "./meta/meta.module";
import { DishComponent } from './dish/dish.component';

import { AuthGuard } from './common/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
// import { App } from './app';

import { routes } from './app.routes';
import { QuestionComponent } from './question/question.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';

// const appRoutes: Routes = [
//   { path: '', component: DishComponent },
//   { path: 'login',  component: Login },
//   { path: 'signup', component: Signup },
//   { path: 'home',   component: Home, canActivate: [AuthGuard] },
//   { path: '**',     component: Login },
// ];

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    DishComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    QuestionComponent,
    ListQuestionsComponent
    // App
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MetaModule,
    RouterModule.forRoot(
      routes,
      {
        enableTracing: true,
        useHash: true
      }
    )
  ],
  providers: [
    AuthGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
