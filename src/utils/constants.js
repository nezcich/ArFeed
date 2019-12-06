import React from 'react';
import * as CryptoIcon from 'react-cryptocoins';

const isProduction = process.env.NODE_ENV === "production";
const etherscan = 'https://viewblock.io/arweave/address/';
export const etherscan_root = 'https://viewblock.io/arweave/';
const defBytes = "0x0000000000000000000000000000000000000000000000000000000000000000";
const defAddr = "0x0000000000000000000000000000000000000000";
const colors = {
  NAS: '#e1cfff',
  KMD: '#326464',
  BTC: '#F7931A',
  ETH: '#608efe',
  LTC: '#B7B7B7',
  NEO: '#78C02E',
  ADC: '#3CB0E5',
  AEON: '#164450',
  AMP: '#048DD2',
  ANC: '#000',
  ARCH: '#002652',
  ARDR: '#1162a1',
  AUR: '#136c5e',
  BANX: '#225BA6',
  BAT: '#9e1f63',
  BAY: '#584ba1',
  BC: '#202121',
  BCN: '#964F51',
  BFT: '#4fc3f7',
  BRK: '#194fa0',
  BRX: '#a8c300',
  BSD: '#1186E7',
  BTA: '#210094',
  BTC: '#F7931A',
  BCC: '#F7931A',
  BTCD: '#2A72DC',
  BTS: '#03A9E0',
  CLAM: '#D6AB31',
  CLOAK: '#DF3F1E',
  DAO: '#FF3B3B',
  DASH: '#1c75bc',
  DCR: '#3b7cfb',
  DCT: '#008770',
  DGB: '#0066cc',
  DGD: '#D8A24A',
  DGX: '#D8A24A',
  DMD: '#5497b2',
  DOGE: '#BA9F33',
  EMC: '#674c8c',
  EOS: '#19191A',
  ERC: '#101E84',
  ETC: '#669073',
  FC2: '#040405',
  FCT: '#2175BB',
  FLO: '#1358C8',
  FRK: '#0633cd',
  FTC: '#679EF1',
  GAME: '#ed1b24',
  GDC: '#E9A226',
  GEMZ: '#e86060',
  GLD: '#E8BE24',
  GNO: '#00A6C4',
  GNT: '#00d6e3',
  GOLOS: '#2670B7',
  GRC: '#88A13C',
  GRS: '#648FA0',
  HEAT: '#ff5606',
  ICN: '#4c6f8c',
  IFC: '#ed272d',
  INCNT: '#f2932f',
  IOC: '#2fa3de',
  IOTA: '#FFFFFF',
  JBS: '#1A8BCD',
  KMD: '#326464',
  KOBO: '#80C342',
  KORE: '#DF4124',
  LBC: '#015C47',
  LDOGE: '#ffcc00',
  LISK: '#1A6896',
  LTC: '#838383',
  MAID: '#5492D6',
  MCO: '#0D3459',
  MINT: '#006835',
  MONA: '#a99364',
  MRC: '#4279bd',
  MSC: '#1D4983',
  MTR: '#b92429',
  MUE: '#f5a10e',
  NBT: '#FFC93D',
  NEO: '#58BF00',
  NEOS: '#1d1d1b',
  NEU: '#2983c0',
  NLG: '#003E7E',
  NMC: '#6787B7',
  NOTE: '#42daff',
  NVC: '#ecab41',
  NXT: '#008FBB',
  OK: '#0165A4',
  OMG: '#1A53F0',
  OMNI: '#18347E',
  OPAL: '#7193AA',
  PART: '#05D5A3',
  PIGGY: '#F27A7A',
  PINK: '#ED31CA',
  PIVX: '#3b2f4d',
  POT: '#105B2F',
  PPC: '#3FA30C',
  QRK: '#22AABF',
  RADS: '#924cea',
  RBIES: '#C62436',
  RBT: '#0d4982',
  RBY: '#D31F26',
  RDD: '#ED1C24',
  REP: '#40a2cb',
  RISE: '#43CEA2',
  SAR: '#1B72B8',
  SCOT: '#3498DB',
  SDC: '#981D2D',
  SIA: '#00CBA0',
  SJCX: '#003366',
  SLG: '#5A6875',
  SLS: '#1EB549',
  SNRG: '#160363',
  START: '#01AEF0',
  STEEM: '#1A5099',
  STR: '#08B5E5',
  STRAT: '#2398dd',
  SWIFT: '#428BCA',
  SYNC: '#008DD2',
  SYS: '#0098DA',
  TRIG: '#1fbff4',
  TX: '#1F8BCC',
  UBQ: '#00ec8d',
  UNITY: '#ED8527',
  USDT: '#2CA07A',
  VIOR: '#1F52A4',
  VNL: '#404249',
  VPN: '#589700',
  VRC: '#418bca',
  VTC: '#1b5c2e',
  WAVES: '#24aad6',
  XAI: '#2ef99f',
  XBS: '#d3261d',
  XCP: '#EC1550',
  XEM: '#41bf76',
  XMR: '#FF6600',
  XPM: '#e5b625',
  XRP: '#346AA9',
  XTZ: '#A6DF00',
  XVG: '#42AFB2',
  YBC: '#D6C154',
  ZEC: '#e5a93d',
  ZEIT: '#ACACAC',
  REVS: '#FF6600',
  MNZ: '#B92484',
  RAI: '#f57898',
};
const getColor = (ticker) => {
  ticker = ticker.toUpperCase();
  if (!colors[ticker]) {
    return undefined;
  } else {
    return colors[ticker];
  }
}
const stringToColour = (str) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}
const getNetworkName = (networkId) => {
  let networkName = "";
  switch (parseInt(networkId)) {
    case 1:
      networkName = "Main";
      break;
    case 2:
      networkName = "Morden";
      break;
    case 3:
      networkName = "Ropsten";
      break;
    case 4:
      networkName = "Rinkeby";
      break;
    case 42:
      networkName = "Kovan";
      break;
    default:
      networkName = "Unknown";
      break;
  }
  return networkName;
}
const smartTrim = (string, maxLength) => {
  if (!string) return string;
  if (maxLength < 1) return string;
  if (string.length <= maxLength) return string;
  if (maxLength == 1) return string.substring(0, 1) + '...';

  var midpoint = Math.ceil(string.length / 2);
  var toremove = string.length - maxLength;
  var lstrip = Math.ceil(toremove / 2);
  var rstrip = toremove - lstrip;
  return string.substring(0, midpoint - lstrip) + '...'
    + string.substring(midpoint + rstrip);
}
function ValidURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?' + // port
    '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
    '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(str);
}
const capitalize = (name) => {
  return name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}
const coinLogoFromTicker = (ticker, size = 25) => {
  return (
    <div className={`crypto-coin custom-coin`}>
      <div className="crypto-coin-bg" style={{ backgroundColor: "" }} ></div>
      <div title={ticker} className="My-Icon"></div>
    </div>
  )
}
const Divider = (props) => {
  return (
    <div className="ContentDivider">
      {/*<img src="https://rawgit.com/task0x/images/master/dividershape.svg" />*/}
    </div>
  );
}
const iframely_key = "15bf45dc7e651185cf2a68";
const moredata = {
  "0x6c727f2721faf880bdcc10608c6c8b6f86d51f0a": { md: require("./mds/yt.js").default }
};
export {
  isProduction,
  getColor,
  etherscan,
  //serverURL,
  defBytes,
  defAddr,
  stringToColour,
  getNetworkName,
  smartTrim,
  coinLogoFromTicker,
  Divider,
  iframely_key,
  ValidURL,
  moredata,
};