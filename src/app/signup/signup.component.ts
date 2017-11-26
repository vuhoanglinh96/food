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
  constructor(public router: Router, public http: Http, private web3Service : Web3Service) {}

  MetaCoin : Promise<any>;
  accounts : string[];

  model = {
    amount: 5,
    receiver: "",
    balance: 0,
    account: ""
  };

  signup(event, username, password) {
    event.preventDefault();
    var wait = true;
    let web3 = this.web3Service;
    let http = this.http;
    let router = this.router;
    let metaCoin = this.MetaCoin;
    var address;
    this.web3Service.createAccount.then(function(val){
      address = val;
    });
    setTimeout(() => {
      console.log(address);
      let body = JSON.stringify({ username, password, address });
      let admin = "0x387908fd4f030c94f7f28ad61b1386d56c12f162"
      let amount = 1000;
      this.web3Service.sendEth(admin, address);
      // this.web3Service.accountsObservable.subscribe((accounts) => {
      //   this.accounts = accounts;
      //   this.model.account = accounts[0];
      //   this.refreshBalance();
      // });
      metaCoin = new Promise((resolve, reject) => {
        setInterval(() => {
          if (web3.ready) {
            resolve(web3.MetaCoin);
          }
        }, 100)
      });
      metaCoin.then((contract) => {
        return contract.deployed();
      }).then((metaCoinInstance) => {
        return metaCoinInstance.sendCoin.sendTransaction(address, amount, {from: admin});
      }).then((success) => {
        if (success) this.refreshBalance();
      })
      http.post('https://hidden-dawn-82868.herokuapp.com/users', body, { headers: contentHeaders })
        .subscribe(
          response => {
            localStorage.setItem('id_token', response.json().id_token);
            localStorage.setItem('address', response.json().address);
            router.navigate(['question']);
          },
          error => {
            alert(error.text());
            console.log(error.text());
          }
        );
    }, 1000)

    // setTimeout(function() {

    // }, 5000)
    // address = this.web3Service.createAccount();


  }

  refreshBalance() {
    console.log("Refreshing balance");

    this.MetaCoin.then((contract) => {
      return contract.deployed();
    }).then((metaCoinInstance) => {
      return metaCoinInstance.getBalance.call(this.model.account);
    }).then((value) => {
      console.log("Found balance: " + value);
      this.model.balance = value.valueOf();
    }).catch(function (e) {
      console.log(e);
      this.setStatus("Error getting balance; see log.");
    });
  };

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

}
