import { observable, action } from "mobx";

const defaultSection = {
  title: "Untitled Data Stream",
  description: "",
  arql: "",
  /*
  column_name: "",
  link: "",
  answers: [""],
  rewardAmount: 0,
  fee: 0,
  radioCheck: [{ label: "Single", selected: true }, { label: "Multiple" }],
  */
};
export default class CreateHitState {

  @observable title = "";
  @observable description;
  @observable wallet = "";
  @observable tokenAddress = "0x0000000000000000000000000000000000000000"; //fake eth
  @observable sections = [];
  @observable rewardAmount = 0;
  @observable fee = 0;
  @observable confirmations = 1;
  @observable radio = [{ label: "myself", selected: true }, { label: "use validators" }];
  @observable selfMine = true;
  @observable tags = [""];
  @observable expiry = 0;
  @observable sideBarIndex = 0;
  @observable cover = "";


  constructor() {
  }
  @action setSidebarIndex = (_index) => {
    this.sideBarIndex = _index;
  }
  @action setTitle = (v) => {
    this.title = v;
  }
  @action setCover = (v) => {
    this.cover = v;
  }
  @action setExpiry = (v) => {
    this.expiry = v;
  }
  @action setDescription = (v) => {
    this.description = v;
  }
  @action setWallet = (v) => {
    this.wallet = v;
  }
  @action setTokenAddress = (v) => {
    this.tokenAddress = v;
  }
  @action setConfirmations = (v) => {
    this.confirmations = v;
  }
  @action setRadio = (i) => {
    this.radio.map(o => {
      o.selected = false;
    })
    this.radio[i].selected = true;
    if (i == 0) {
      this.selfMine = true;
    } else {
      this.selfMine = false;
    }
  }
  @action setRadioOrCheck = (index, i) => {
    this.sections[index - 1].radioCheck.map(o => {
      o.selected = false;
    })
    this.sections[index - 1].radioCheck[i].selected = true;
    if (i == 0) {
      this.sections[index - 1].isCheckBox = false;
    } else {
      this.sections[index - 1].isCheckBox = true;
    }
  }
  @action setTag = (index, v) => {
    this.tags[index] = v;
  }
  @action removeTag = (index) => {
    if (index == 0) return false;
    this.tags.splice(index, 1);
  }
  @action addTagLabel = (index) => {
    if (this.tags.length == 5) return false;
    this.tags.push("");
  }
  @action setSubTitle = (index, v) => {
    this.sections[index - 1].title = v;
  }
  @action setSubDescription = (index, v) => {
    this.sections[index - 1].description = v;
  }
  @action setSubARQL = (index, v) => {
    this.sections[index - 1].arql = v;
  }
  @action setSubColumn = (index, v) => {
    this.sections[index - 1].column_name = v;
  }
  @action setSubLink = (index, v) => {
    this.sections[index - 1].link = v;
  }
  @action setSubRewardAmount = (index, v) => {
    //v = v.match(/^\d+(\.\d+)?$/);
    //if(!v) return false;
    //const t = v[0];
    this.sections[index - 1].rewardAmount = v;
  }
  @action setSubFee = (index, v) => {
    this.sections[index - 1].fee = v;
  }
  @action setSubRewardAmountAll = (v) => {
    this.rewardAmount = v;
    this.sections.map(o => {
      o.rewardAmount = v;
    })
  }
  @action setSubFeeAll = (v) => {
    this.fee = v;
    this.sections.map(o => {
      o.fee = v;
    })
  }

  @action setSubAnswerLabel = (index, indexLabel, v) => {
    this.sections[index - 1].answers[indexLabel] = v;
  }
  @action addAnswerLabel = (index) => {
    this.sections[index - 1].answers.push("");
  }
  @action addSection = (hittype = 0) => {
    this.sections.push(Object.assign(defaultSection/*, { hittype }*/));
  }
  @action removeSection = (index) => {
    if (index > 0) {
      this.sections.splice(index - 1, 1);
    }
  }
}