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

    if (this.windowRef.nativeWindow) {
      if (this.windowRef.nativeWindow.web3) {
        var jwt = localStorage.getItem('id_token');
    // this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
        var decodedJwt = this.jwtHelper.decodeToken(jwt);
        // console.log(decodedJwt);
        console.log('Using provided web3 implementation');
        this.web3 = new Web3(this.windowRef.nativeWindow.web3.currentProvider);
        // this.web3 = this.web3.eth.accounts.privateKeyToAccount(decodedJwt.private);
        // var web4 = this.web3.eth.accounts.privateKeyToAccount(decodedJwt.private);
        // Bootstrap the MetaCoin abstraction for Use.
        this.MetaCoin.setProvider(this.web3.currentProvider);
        // web4.eth.getAccounts(console.log)
        console.log(this.MetaCoin);
        this.refreshAccounts();
      }
      else {
        console.log("Not finding web3");
      }
    }
    else {
      console.log("Can't get window reference");
    }
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
        this.accounts = accs;
      }

      this.ready = true;
    });
  }
}
