import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { etherscan, coinLogoFromTicker, stringToColour, smartTrim } from '../../utils/constants.js';
import MyIcon from './MyIcon';
import moment from 'moment';
import Language from "../Language";

class TaskHeader extends React.Component {
	constructor(props) {
		super(props);
		this.store = props.store;
		this.state = {
			warning: "",
			disabled: false,
		}
	}
	tip = async () => {
		const { wallet, id, owner } = this.props;
		var amt = parseFloat(document.getElementById('tipamt').value);
		if (!this.store.appState.jwk) {
			this.store.appState.showMsg("Login First");
			return false;
		}
		if (this.store.appState.address == owner) {
			this.store.appState.showMsg("Cant tip to yourself");
			return false;
		}
		if (isNaN(amt) || amt == 0) {
			this.store.appState.showMsg("Invalid Tip Amount");
			return false;
		}
		await this.store.nebStore.sendTip({ amt, id, wallet: (wallet || owner) }, this.store.appState.jwk);
		this.store.appState.showMsg("Tip Sent!");

	}
	render() {
		let expand = true;
		const { id, balance, description, cover, tags, title, owner, votes, startedOn, tips, wallet } = this.props;
		let t = [];
		if (tags) t = tags;
		let token = { name: "TBA" };

		let cl = (expand) ? "expand" : "";
		cl += (cover) ? "" : " nocover";


		return (
			<div className={`flex box boxkill ${cl}`}>
				{cover ? <div className="cover" style={{ backgroundImage: `url(https://ipfs.infura.io/ipfs/${cover})` }}></div> : ""}
				<div className="flex col _11" style={{ maxWidth: "80%" }}>
					<div className="titlebig">
						<div className="flex algn">
							<div className="flex col">
								<i className="material-icons">keyboard_arrow_up</i>
								<div className="flex jc">{votes || 0}</div>
								<i className="material-icons">keyboard_arrow_down</i>
							</div>
							<div className="explore-title"><a href={`${etherscan}${wallet}`} target="_blank">{title}</a></div>
						</div>
						<div className="explore-descr">{description}</div>
					</div>
					<div className="flex">
						<div className="col5">
							<div className="hit-label"><Language resource="THEAD.AUTHOR" /></div>
							<div className="flex algn">
								<a href={`${etherscan}${owner}`}><MyIcon id={owner} size={5} scale={5} /></a>
								<div>{smartTrim(owner, 15)}</div>
							</div>
						</div>
						<div className="col5">
							<div className="hit-label"><Language resource="THEAD.WALLET" /></div>
							<div className="flex algn">
								<a href={`${etherscan}${wallet}`}><MyIcon id={wallet} size={5} scale={5} /></a>
								<div>{smartTrim(wallet, 15)}</div>
							</div>
						</div>
						<div className="flex fwrap">
							<div className="col4">
								<div className="hit-label"><Language resource="THEAD.BAL" /></div>
								<div className="hit-light flex algn">
									<div className="subheader bold">{balance}</div>
									<div className="coin">
										{coinLogoFromTicker(token.name, 15)}
									</div>
								</div>
							</div>
							<div className="col3">
								<div className="hit-label"><Language resource="THEAD.ADD" /></div>
								<div className="hit-light">{moment(startedOn * 1000).fromNow()}</div>
							</div>

							<div className="col4">
								<div className="hit-label"><Language resource="THEAD.TIPS" /></div>
								<div className="hit-light flex algn">
									<div className="subheader bold">{tips}</div>
									<div className="coin">
										{coinLogoFromTicker(token.name, 15)}
									</div>
								</div>
							</div>

						</div>
					</div>
					<div className="flex mgt10">
						{
							t.map((o, i) => {
								if (!o) return (null);
								return (<div key={i} className="explore-tag" style={{ backgroundColor: `${stringToColour(o.toLowerCase())}` }}>{o}</div>)
							})
						}
					</div>

				</div>
				<div className="flex col">
					<div className="flex explore-worker algn">
						{
							this.store.appState.address != owner ?
								(<div>
									<input placeholder="Tip Amount" type="text" className="hit-descr full" id="tipamt" />
									<button onClick={this.tip} className="secondary-btn thin cta blockchainbtn"><Language resource="THEAD.TIP" /></button>
								</div>)
								: <a href={`${etherscan}${wallet}`} target="_blank"><button className="secondary-btn thin cta blockchainbtn"><Language resource="THEAD.BEX" /></button></a>
						}

					</div>
				</div>

			</div>
		);
	}
}

export default TaskHeader;