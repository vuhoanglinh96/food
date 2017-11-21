import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';

import {Web3Service} from "../util/web3.service";

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit {

  constructor(public router: Router, private web3Service : Web3Service, public http: Http) {
    console.log("Constructor: " + web3Service);
  }

  ngOnInit() {
    console.log("OnInit: " + this.web3Service);
    console.log(this);
    this.watchAccount();
    this.MetaCoin = new Promise((resolve, reject) => {
      setInterval(() => {
        if (this.web3Service.ready) {
          resolve(this.web3Service.MetaCoin);
        }
      }, 100)
    this.getRandomQuestion();
    });
  }

  question : Object;
  quizMaker = {
    address: "",
    username: "",
  };

  getRandomQuestion() {
    this.http.get('http://localhost:3001/question', { headers: contentHeaders })
      .subscribe(
        response => {
          this.question = response.json().question;
          this.quizMaker.address = response.json().user.address;
          this.quizMaker.username = response.json().user.username;
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  accounts : string[];
  MetaCoin : Promise<any>;

  model = {
    amount: 5,
    receiver: "",
    balance: 0,
    account: ""
  };

  status = "";

  watchAccount() {
    console.log(this.web3Service.accounts);
    var acc = [this.web3Service.accounts];
    console.log(acc);
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      this.refreshBalance();
    });
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

  setStatus(status) {
    this.status = status;
  };

  answer(answer, question) {
    if (!this.MetaCoin) {
      this.setStatus("Metacoin is not loaded, unable to send transaction");
      return;
    }

    this.setStatus("Initiating transaction... (please wait)");

    this.MetaCoin.then((contract) => {
      return contract.deployed();
    }).then((metaCoinInstance) => {
      console.log(answer);
      console.log(question.right);
      if (answer != question.right)
        return metaCoinInstance.sendCoin.sendTransaction(this.quizMaker.address, 100, {from: this.model.account});
      return metaCoinInstance.sendCoin.sendTransaction(this.model.account, 100, {from: this.quizMaker.address});
    }).then((success) => {
      if (!success) {
        this.setStatus("Transaction failed!");
      }
      else {
        this.setStatus("Transaction complete!");
      }
    }).catch((e) => {
      console.log(e);
      this.setStatus("Error sending coin; see log.");
    });
  };

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('address');
    this.router.navigate(['login']);
  }
}
