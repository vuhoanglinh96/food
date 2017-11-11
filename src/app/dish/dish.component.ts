import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Web3Service} from "../util/web3.service";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  constructor(public router: Router, private web3Service : Web3Service) {
    console.log("Constructor: " + web3Service);
  }

  dishes = [
    {
      "id": 0,
      "name": "Pizza phô mai",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 3,
      "breed": "Scottish Terrier",
      "price": 100,
      "location": "Lisco, Alabama"
    },
    {
      "id": 1,
      "name": "Pizza bò",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 3,
      "breed": "Scottish Terrier",
      "price": 100,
      "location": "Tooleville, West Virginia"
    },
    {
      "id": 2,
      "name": "Pizza hải sản",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 2,
      "breed": "French Bulldog",
      "price": 100,
      "location": "Freeburn, Idaho"
    },
    {
      "id": 3,
      "name": "Melissa",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 2,
      "breed": "Boxer",
      "price": 100,
      "location": "Camas, Pennsylvania"
    },
    {
      "id": 4,
      "name": "Jeanine",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 2,
      "breed": "French Bulldog",
      "price": 100,
      "location": "Gerber, South Dakota"
    },
    {
      "id": 5,
      "name": "Elvia",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 3,
      "breed": "French Bulldog",
      "price": 100,
      "location": "Innsbrook, Illinois"
    },
    {
      "id": 6,
      "name": "Latisha",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 3,
      "breed": "Golden Retriever",
      "price": 100,
      "location": "Soudan, Louisiana"
    },
    {
      "id": 7,
      "name": "Coleman",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 3,
      "breed": "Golden Retriever",
      "price": 100,
      "location": "Jacksonwald, Palau"
    },
    {
      "id": 8,
      "name": "Nichole",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 2,
      "breed": "French Bulldog",
      "price": 100,
      "location": "Honolulu, Hawaii"
    },
    {
      "id": 9,
      "name": "Fran",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 3,
      "breed": "Boxer",
      "price": 100,
      "location": "Matheny, Utah"
    },
    {
      "id": 10,
      "name": "Leonor",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 2,
      "breed": "Boxer",
      "price": 100,
      "location": "Tyhee, Indiana"
    },
    {
      "id": 11,
      "name": "Dean",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 3,
      "breed": "Golden Retriever",
      "price": 100,
      "location": "Windsor, Montana"
    },
    {
      "id": 12,
      "name": "Stevenson",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 3,
      "breed": "French Bulldog",
      "price": 100,
      "location": "Kingstowne, Nevada"
    },
    {
      "id": 13,
      "name": "Kristina",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 4,
      "breed": "Golden Retriever",
      "price": 100,
      "location": "Sultana, Massachusetts"
    },
    {
      "id": 14,
      "name": "Ethel",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 2,
      "breed": "Golden Retriever",
      "price": 100,
      "location": "Broadlands, Oregon"
    },
    {
      "id": 15,
      "name": "Terry",
      "picture": "http://cdn.24.co.za/files/Cms/General/d/2097/4f579e5d46e041d387b17b23352c7520.jpg",
      "age": 2,
      "breed": "Golden Retriever",
      "price": 100,
      "location": "Dawn, Wisconsin"
    }
  ]

  ngOnInit(): void {
    console.log("OnInit: " + this.web3Service);
    console.log(this);
    this.watchAccount();
    this.MetaCoin = new Promise((resolve, reject) => {
      setInterval(() => {
        if (this.web3Service.ready) {
          resolve(this.web3Service.MetaCoin);
        }
      }, 100)
    });
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
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      this.refreshBalance();
    });
  }

  setStatus(status) {
    this.status = status;
  };

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
  }

  order(value) {
    if (!this.MetaCoin) {
      this.setStatus("Metacoin is not loaded, unable to send transaction");
      return;
    }

    console.log("Sending coins" + this.model.amount + " to " + this.model.receiver);


    let amount = value;
    let receiver = '0x4b7dafb95151f8ec334ba610bc74bb33ba7298c3';

    this.setStatus("Initiating transaction... (please wait)");

    this.MetaCoin.then((contract) => {
      return contract.deployed();
    }).then((metaCoinInstance) => {
      return metaCoinInstance.sendCoin.sendTransaction(receiver, amount, {from: this.model.account});
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

  // clickAddress(e) {
  //   this.model.account = e.target.value;
  //   this.refreshBalance();
  // }

  // setAmount(e) {
  //   console.log("Setting amount: " + e.target.value);
  //   this.model.amount = e.target.value;
  // }

  // setReceiver(e) {
  //   console.log("Setting receiver: " + e.target.value);
  //   this.model.receiver = e.target.value;
  // }

}
