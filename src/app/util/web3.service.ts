import {Injectable, OnInit, Output, EventEmitter} from '@angular/core';
import {default as Web3} from 'web3';
import {default as Web3EthAccounts} from 'web3-eth-accounts';
import {default as Web3EthPersonal} from 'web3-eth-personal';
import {WindowRefService} from "./window-ref.service";

import {default as contract} from 'truffle-contract'
import metacoin_artifacts from '../../../build/contracts/MetaCoin.json'
import {Subject} from "rxjs";
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class Web3Service {

  private web3 : Web3;
  public accounts : string[];
  public ready : boolean = false;
  public MetaCoin : any;
  jwtHelper: JwtHelper = new JwtHelper();

  public accountsObservable = new Subject<string[]>();

  constructor(private windowRef : WindowRefService) {
    this.MetaCoin = contract(metacoin_artifacts);
    this.checkAndRefreshWeb3();
    // setInterval(() => this.checkAndRefreshWeb3(), 100);
  }

  private checkAndRefreshWeb3() {
    if (this.ready) {
      this.refreshAccounts();
      return;
    }

    this.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
    var jwt = localStorage.getItem('id_token');
    var address = localStorage.getItem('address');
    if (!address) return;
    var decodedJwt = this.jwtHelper.decodeToken(jwt);
    console.log(address);
    this.MetaCoin.setProvider(this.web3.currentProvider);
    this.refreshAccounts();
  };

  public createAccount = new Promise((resolve) => {
    var account = new Web3EthPersonal('https://ropsten.infura.io/');
    account.newAccount('hello').then(function(res){
      account.unlockAccount(res, 'hello', 100000);
      resolve(res);
    })
  });

  public sendEth(sender, receiver) {
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
    var amount = this.web3.toWei(3, "ether");
    this.web3.eth.sendTransaction({from:sender, to:receiver, value: amount})
  }

  private refreshAccounts() {
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      var address = localStorage.getItem('address');
      if (!address) return;

      if (!this.accounts || this.accounts.length != accs.length || this.accounts[0] != accs[0]) {
        accs = [address];
        console.log("Observed new accounts");
        this.accountsObservable.next(accs);
        console.log(this.accountsObservable);
        this.accounts = accs;
      }

      this.ready = true;
    });
  }
}
