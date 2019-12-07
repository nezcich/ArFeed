import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { etherscan, coinLogoFromTicker, stringToColour, smartTrim } from '../../utils/constants.js';

import { getFromIPFS } from '../../services/ipfsService.js';
import MyIcon from './MyIcon';
import LinearProgress from '@material-ui/core/LinearProgress';
import Language from "../Language";


@inject("store")
@observer
export default class ExploreDiv extends Component {
	constructor(props) {
		super(props);
		this.store = props.store;

		this.state = {
			result: null,
		}
	}
	componentDidMount() {
		const { ipfs_hash, expand } = this.props;

		getFromIPFS(ipfs_hash).then(async (res) => {
			if (res) {
				this.setState({ result: res })
			}
		})
	}
	render() {
		const { index, expand, addr, owner, participantCount, confirmations, user_address, type, fee } = this.props;
		const { result } = this.state;

		let t = [];
		if (result) {
			const { tags } = result;
			if (tags) t = tags;
		}
		return (
			<div className={`market-div`}>
				{(!result) ? (<LinearProgress color="secondary" />) :
					(
						<div className="flex">
							<div className="cover" style={{ backgroundImage: `url(https://ipfs.infura.io/ipfs/${result.cover})` }}></div>
							<div className="mcover flex col zindex">
								<div className="explore-title titlebig">{result.title}</div>
								<div className="explore-descr">{result.description}</div>

								<div className="flex">
									<div className="col5">
										<div className="hit-label"><Language resource="OWNER" /></div>
										<div className="flex algn">
											<a href={`${etherscan}${owner}`}><MyIcon profile={result.profile} id={owner} size={4} scale={4} /></a>
											<div>{result.profile ? result.profile.name : smartTrim(owner, 15)}</div>
										</div>
									</div>
									<div className="flex fwrap">
										<div className="col4">
											<div className="hit-label"><Language resource="PRICE" /></div>
											<div className="hit-light flex algn">
												<div className="subheader bold">{addr}</div>
												<div className="coin">
													{coinLogoFromTicker("NAS", 15)}
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
							<div className="mcover zindex">
								<button onClick={this.props.onClick} className="req-button"><div className="req-logo"><div className="reqimg"></div></div><div className="req-text"><Language resource="BUY" /></div></button>
							</div>
						</div>
					)
				}
			</div>
		);
	}

}