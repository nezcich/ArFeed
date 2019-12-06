import { observable, action } from "mobx";
import Arweave from 'arweave/web';

const profile_key = "profile";

export default class AppState {
  @observable authenticated;

  @observable address = "0x0";
  @observable jwk = null;
  @observable createButtonDisabled = false;
  @observable netId = 0;
  @observable miner = {
    level: 0,
    miningCount: 0,
  };

  @observable snackmsg = "";
  @observable snackopen = false;
  @observable profile = null;

  constructor() {
    this.authenticated = true;
    this.connectTimer = null;
  }
  @action setJwk = async (jwk) => {
    this.jwk = jwk;
    this.address = await Arweave.init().wallets.jwkToAddress(jwk);
  }
  @action connectMetamask = () => {
    window.postMessage({
      "target": "contentscript",
      "method": "getAccount"
    }, "*");
    window.addEventListener('message', e => {
      if (e.data && e.data.data && e.data.data.account) {
        this.netId = 1;
        this.address = e.data.data.account;
        this.authenticated = true;
      }
    })
  }
  @action disableButton = (state) => {
    this.createButtonDisabled = state;
  }
  @action minerStatus = () => {
    /*
    getMinerStatus()
    .then((res)=>{
      if(res){
        this.miner = res;
      }
    })
    */
  }
  @action handleClose = () => {
    this.snackopen = false;
  }
  @action showMsg = (_msg) => {
    this.snackmsg = _msg;
    this.snackopen = true;
  }
  @action clearProfile = () => {
    this.jwk = null;
  }
}
