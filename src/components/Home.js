import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import BasicHIT from './BasicHIT.js';
import TextareaAutosize from 'react-autosize-textarea';
import BHitSection from './ui/BHitSection.js';
import UnlockMeta from './ui/UnlockMeta.js';
import { StickyContainer, Sticky } from 'react-sticky';
import Language from "./Language";
import moment from "moment";

const RoundBtn = (props) => {
	const cl = (props.disabled) ? "disabled" : "";
	return (
		<div className={`RoundBtn flex col algn ${cl}`} onClick={props.onClick}>
			<i className="material-icons">{props.icon}</i>
			<span>{props.label}</span>
		</div>
	)
}

@inject("store")
@observer
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store.appState;
	}
	onStandaloneSelect = (value) => {
		const { createHitState } = this.props.store;
		const expiry = Math.floor(moment.unix(value)._i / 1000000);
		createHitState.setExpiry(expiry);
	}
	getSideBar = () => {
		const { createHitState } = this.props.store;
		const { wallet, sideBarIndex, title, description, tokenAddress, rewardAmount, fee, confirmations, radio, selfMine, sections, tags } = createHitState;
		const index = sideBarIndex;
		const now = moment();

		if (index == 0) {
			return (
				<div>
					<div className="hit-label"><Language resource="SIDE.DESCR" /><span className="hit-light"> <Language resource="SIDE.OPT" /></span></div>
					<TextareaAutosize className="hit-descr full" value={description} onChange={(e) => { createHitState.setDescription(e.target.value) }} />

					<div className="hit-label"><Language resource="SIDE.WALLET" /></div>
					<TextareaAutosize className="hit-descr full" value={wallet} onChange={(e) => { createHitState.setWallet(e.target.value) }} />


					<div className="hit-options">
						<div className="hit-label"><Language resource="SIDE.TAGS" /> <span className="hit-light"><Language resource="SIDE.MAX5" /></span></div>
						<div className="flex fwrap taginput">
							{tags.map((o, i) => {
								return (<input key={i} type="text" value={o} placeholder={`Tag #${i + 1}`}
									onKeyDown={(e) => {
										if ((e.keyCode == 8 || e.keyCode == 46) && e.target.value == "") {
											createHitState.removeTag(i)
										}
									}}
									onChange={(e) => {
										createHitState.setTag(i, e.target.value)
									}}
								/>);
							})}
							<button type="button" className="secondary-btn cta thin" onClick={(e) => { createHitState.addTagLabel() }} ><i className="material-icons">add</i></button>
						</div>
					</div>
				</div>
			)
		} else {
			const o = sections[index - 1];
			return (
				<BHitSection index={index} {...o} selfMine={selfMine} />

			)
			return (
				<Sticky topOffset={30}>
					{
						({
							isSticky,
							wasSticky,
							style,
							distanceFromTop,
							distanceFromBottom,
							calculatedHeight
						}) => {
							console.log(index)
							console.log(o)
							return (
								<BHitSection style={style} index={index} {...o} selfMine={selfMine} />

							)
						}
					}
				</Sticky>
			)
		}
	}
	render() {
		const { authenticated, netId, createButtonDisabled } = this.store;
		return (
			<div className="page home">
				{authenticated ?
					(
						<div className="flex hitbox">
							<StickyContainer className="bluebg menubar">
								<Sticky topOffset={30}>
									{
										({
											isSticky,
											wasSticky,
											style,
											distanceFromTop,
											distanceFromBottom,
											calculatedHeight
										}) => {
											return (
												<div style={style}>
													<RoundBtn onClick={() => { this.props.store.createHitState.addSection(0) }} label={<Language resource="LF.ADD" />} icon="add" />
													{/*
													<RoundBtn onClick={() => { this.props.store.createHitState.addSection(1) }} label={<Language resource="LF.SINGLE" />} icon="radio_button_checked" />
													<RoundBtn onClick={() => { this.props.store.createHitState.addSection(2) }} label={<Language resource="LF.MULTI" />} icon="check_box" />
													<RoundBtn onClick={() => { this.props.store.createHitState.addSection(3) }} label={<Language resource="LF.LABEL" />} icon="timeline" />
													<RoundBtn disabled label={<Language resource="LF.PIC" />} icon="insert_photo" />
													<RoundBtn disabled label={<Language resource="LF.VID" />} icon="videocam" />
													<RoundBtn disabled label={<Language resource="LF.AUDIO" />} icon="headset" />
													<RoundBtn disabled label={<Language resource="LF.FILE" />} icon="insert_drive_file" />
													*/}
												</div>
											)
										}
									}
								</Sticky>
							</StickyContainer>
							<div className="flex col box _11">
								<BasicHIT />
								<div className="flex">
									<button id="create-btn" type="button" className="_11 secondary-btn cta black" disabled={createButtonDisabled} onClick={this.createHIT} ><Language resource="HOME.NEW" /></button>
								</div>
							</div>
							<StickyContainer className="flex col box lbluebg">
								{this.getSideBar()}
							</StickyContainer>
						</div>
					)
					:
					(<UnlockMeta />)
				}
			</div>
		);
	}
	createHIT = async () => {
		const { createHitState, appState } = this.props.store;
		const { wallet, title, description, sections, tags, cover } = createHitState;

		if (!appState.jwk) {
			appState.showMsg("Not Logged In");
			return false;
		}
		if (!title) {
			appState.showMsg("Empty Feed Title!");
			return false;
		}
		if (!wallet) {
			appState.showMsg("Feed Wallet Address Not Found!");
			return false;
		}
		if (sections.length == 0) {
			appState.showMsg("No Stream Added!");
			return false;
		}
		for (let i = 0; i < sections.length; i++) {

			if (sections[i].title == "") {
				appState.showMsg(`Empty Title in section ${i + 1}`)
				return false;
			}
			if (sections[i].arql == "") {
				appState.showMsg(`Empty Arql/Graphql query in section ${i + 1}`)
				return false;
			}
		}
		this.store.disableButton(true);
		this.props.store.nebStore.createFeed({ title, description, sections, cover, wallet, tags }, appState.jwk).then(contract_addr => {
			this.props.history.push(`/tasks/tx/${contract_addr}`);
		});
	}

}
