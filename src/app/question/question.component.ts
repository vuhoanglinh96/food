import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { contentHeaders } from '../common/headers';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  jwtHelper: JwtHelper = new JwtHelper();
  jwt: string;
  decodedJwt: {
    id: number;
  };
  user_id: number;

  constructor(public router: Router, public http: Http) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwtHelper.decodeToken(this.jwt);
    this.user_id = this.decodedJwt.id;
  }

  make_question(event, question, answerA, answerB, answerC, answerD, right){
    event.preventDefault();
    var user_id = this.user_id;
    let body = JSON.stringify({ question, answerA, answerB, answerC, answerD, right, user_id });

    this.http.post('https://hidden-dawn-82868.herokuapp.com/question', body, { headers: contentHeaders })
      .subscribe(
        response => {
          alert("Thêm thành công");
        },
        error => {
          alert(error.text());
        }
      );
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('address');
    this.router.navigate(['login']);
  }
}
