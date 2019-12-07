import React from 'react';

const isProduction = process.env.NODE_ENV === "production";
const etherscan = 'https://viewblock.io/arweave/address/';
export const etherscan_root = 'https://viewblock.io/arweave/';
const defBytes = "0x0000000000000000000000000000000000000000000000000000000000000000";
const defAddr = "0x0000000000000000000000000000000000000000";
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
  ValidURL,
};