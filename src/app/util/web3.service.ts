import {Injectable, OnInit, Output, EventEmitter} from '@angular/core';
import {default as Web3} from 'web3';
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
    setInterval(() => this.checkAndRefreshWeb3(), 100);
  }

  private checkAndRefreshWeb3() {
    if (this.ready) {
      this.refreshAccounts();
      return;
    }

    this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    var jwt = localStorage.getItem('id_token');
    var address = localStorage.getItem('address');
    var decodedJwt = this.jwtHelper.decodeToken(jwt);
    console.log(address);
    // this.accounts = [];
    // for this.web3.eth.accounts
    // this.accounts = [address];
    this.MetaCoin.setProvider(this.web3.currentProvider);
    // for (var i = 0; i < this.web3.eth.accounts.length; i++){
    //   if (address == this.web3.eth.accounts[i]) this.accounts = this.web3.eth.accounts[i];
    //   this.ready = true;
    // }
    // this.accountsObservable.next(address);
    // var acc = [address];
    // this.accountsObservable.next(acc);
    this.refreshAccounts();
  };

  public createAccount() {
    return this.web3.eth.accounts.create();
  };

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

      if (!this.accounts || this.accounts.length != accs.length || this.accounts[0] != accs[0]) {
        console.log("Observed new accounts");
        this.accountsObservable.next(accs);
        console.log(this.accountsObservable);
        this.accounts = accs;
      }

      this.ready = true;
    });
  }
}
