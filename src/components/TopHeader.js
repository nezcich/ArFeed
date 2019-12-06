import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import { getNetworkName, smartTrim } from '../utils/constants';
import SimpleMenu from './Auth/SimpleMenu';
import Language from "./Language";



@withRouter
@inject("store")
@observer
export default class TopHeader extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}
	login = () => {
		document.getElementById("upload").click();
	}
	readWallet = async (file) => {
		this.store.appState.setJwk(JSON.parse(await loadWallet(file)))
	}
	signout = () => {
		this.store.appState.clearProfile();
	}
	render() {
		const { authenticated, address, connectMetamask, netId } = this.store;
		const { jwk } = this.store.appState;
		const network = getNetworkName(netId);
		return (
			<div className="topheader flex algn">
				<input type="file" style={{ display: "none" }} id="upload" onChange={e => this.readWallet(e.target.files[0])} />
				<div className="_11">
					{/*<input type="text" id="topsearch" placeholder="Search for Tasks, Tx, Workers..." />*/}
				</div>
				<div id="loginbox">

					{jwk ?
						<button onClick={this.signout} className="secondary-btn cta thin blockchainbtn"><Language resource="LOGOUT" /></button>
						:
						<button onClick={this.login} className="secondary-btn cta thin blockchainbtn"><Language resource="LOGIN" /></button>
					}
				</div>
			</div>
		);
	}
}

const loadWallet = (wallet) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => {
			reader.abort()
			reject()
		}
		reader.addEventListener("load", () => { resolve(reader.result) }, false)
		reader.readAsText(wallet)
	})
}