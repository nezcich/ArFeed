import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { smartTrim, coinLogoFromTicker } from '../../utils/constants.js';

import MyIcon from './MyIcon';

import moment from 'moment';

@inject("store")
@observer
export default class TaskList extends Component {
	constructor(props) {
		super(props);
		this.store = props.store;
	}
	render() {
		const { title, owner, startedOn, tips, balance } = this.props;


		const vote = 0;
		return (
			<div className="explore-div">
				<div className="flex algn">
					<div className="flex col">
						<i className="material-icons">keyboard_arrow_up</i>
						<div className="flex jc">{vote}</div>
						<i className="material-icons">keyboard_arrow_down</i>
					</div>
					<div className="col1 flex">
						<MyIcon id={owner} size={4} scale={4} />
						<div>{smartTrim(owner, 15)}</div>
					</div>
					<div className="col2 explore-title">{title}</div>
					<div className="col3">{moment(startedOn * 1000).fromNow()}</div>
					<RewardDips amt={balance} name={""} />
					<RewardDips amt={tips} name={""} />
				</div>
				{/*
				<div className="explore-hidden">
					<Divider />
					<div className="flex fwrap">
						{result.cover ? <div className="boxpattern" style={{ backgroundImage: `url(https://ipfs.infura.io/ipfs/${result.cover})` }}></div> : ""}
						<div>
							<div className="hit-label"><Language resource="DESCR" /></div>
							<div className="explore-descr">{result.description ? result.description : <Language resource="NODESCR" />}</div>
						</div>
						<Col3Reward header={<Language resource="THEAD.BAL" />} amt={this.state.bal} name={token.name} />
						{statusRow}
						{claimRow}
						<div className="col3">
							{
								result.tags.map((o, i) => {
									if (!o) return (null);
									return (<div key={i} className="explore-tag" style={{ backgroundColor: `${stringToColour(o.toLowerCase())}` }}>{o}</div>)
								})
							}
						</div>

					</div>

				</div>
						*/}

			</div>
		);
	}
}
const RewardDips = (props) => {
	return (
		<div className="col3 flex algn">
			<div className="">{props.amt}</div>
			<div className="coin">
				{coinLogoFromTicker(props.name, 15)}
			</div>
		</div>
	);
}
const Col3 = (props) => {
	return (
		<div className="col3">
			<div className="hit-label">{props.header}</div>
			<div className="hit-light">{props.body}</div>
		</div>
	);
}
const Col3Reward = (props) => {
	return (
		<div className="col3">
			<div className="hit-label">{props.header}</div>
			<div className="hit-light flex algn">
				<div className="">{props.amt}</div>
				<div className="coin">
					{coinLogoFromTicker(props.name, 15)}
				</div>
			</div>
		</div>
	)
}