import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";

import SimpleMenu from './ui/SimpleMenu';
import MyIcon from './ui/MyIcon';
import TopNav from "./TopNav";
import Button from "./ui/Button";
import { getNetworkName, smartTrim } from '../utils/constants';
import { FormControl, Icon, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import packagejson from '../../package.json';


@withRouter
@inject("store")
@observer
export default class TopBar extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}
	handleChange = (event) => {
		this.store.languageStore.changeLanguageTo(event.target.value);
	}
	render() {
		const { authenticated, address, connectMetamask, netId } = this.store.appState;
		const { get_currentLanguage } = this.store.languageStore;

		const Icon = (authenticated) ? (<MyIcon id={address} />) : (<i className="material-icons identicon">account_circle</i>);
		const addr = (address) ? smartTrim(address, 15) : "Unlock ArWallet";
		const network = getNetworkName(netId);
		return (
			<div className="topbar">
				<TopNav location={this.props.location} />
				<SimpleMenu onClick={connectMetamask}>
					<div className="flex algn clearfix">
						{Icon}
						<div className="flex col">
							<span className="metamask">ArWallet ({network}) </span>
							<span className="addr">{addr}</span>
						</div>
					</div>
				</SimpleMenu>


				<FormControl component="fieldset" className="formLang">
					<RadioGroup
						value={get_currentLanguage()}
						onChange={this.handleChange}
					>
						<FormControlLabel value="en" control={<Radio />} label="English" />
						<FormControlLabel value="ch" control={<Radio />} label="中文" />
					</RadioGroup>
				</FormControl>


				<div className="software-version">v{packagejson.version}</div>
			</div>
		);
	}
}
