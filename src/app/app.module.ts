import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {MetaModule} from "./meta/meta.module";
import { DishComponent } from './dish/dish.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
  { path: '', component: DishComponent },
  { path: '**', component: SignupComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DishComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MetaModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
