import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import { etherscan, etherscan_root } from '../utils/constants.js';

import { Link } from "react-router-dom";
import ExploreDiv from './ui/ExploreDiv';
import LinearProgress from '@material-ui/core/LinearProgress';
import Language from "./Language";

@inject("store")
@observer
export default class Task extends Component {

	constructor(props) {
		super(props);
		this.store = this.props.store;
		this.state = {
			task: null,
			mined: false,
		}
	}
	componentDidMount() {
		const { tx_hash } = this.props.match.params;
		if (tx_hash) {
			this.getTxStatus();
		}
	}
	getTxStatus = async () => {
		const { tx_hash } = this.props.match.params;
		let tx = await this.store.nebStore.tx_status(tx_hash);
		let task = await this.store.nebStore.fetchFeedDetails(tx);
		this.setState({
			task,
		});
	}
	render() {
		const { task } = this.state;
		const { address, tx_hash } = this.props.match.params;
		const Loading = (!task) ? (<LinearProgress color="secondary" />) : (null);
		const txDisp = (tx_hash) ? (<a style={{ "margin": "10px" }} href={`${etherscan_root}tx/${tx_hash}`} target="_blank">{`Browse Tx: ${tx_hash} on Explorer `}</a>) : "";
		return (
			<div className="page task">
				{Loading}
				<div className="greyheader"><a href={`/task/${address}`}><Language resource="T.TASK" /></a></div>
				<div className="flex col">
					{
						(!task) ?
							(txDisp) :
							(<ExploreDiv {...this.props} {...task} />)
					}
				</div>
			</div>
		);
	}
}
const ArrowRight = (props) => {
	return (<i className="material-icons">keyboard_arrow_right</i>);
}