import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';
import {Web3Service} from "../util/web3.service";

// const styles = './signup.component.css';
// const template = './signup.component.html';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.css' ]
})
export class SignupComponent {
  constructor(public router: Router, public http: Http, private web3Service : Web3Service) {
  }

  signup(event, username, password) {
    event.preventDefault();
    var web3Account = this.web3Service.createAccount();
    var publicKey = web3Account.address;
    var privateKey = web3Account.privateKey;
    let body = JSON.stringify({ username, password, publicKey, privateKey });
    console.log(body);
    this.http.post('http://localhost:3001/users', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().id_token);
          console.log(response.json().id_token);
          this.router.navigate(['dish']);
          console.log(localStorage.getItem('id_token'));
          console.log(localStorage.getItem('profile'));
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

}
