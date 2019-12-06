import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { storeOnIPFS, getFromIPFS } from '../../services/ipfsService.js';
import { moredata, etherscan } from '../../utils/constants.js';
import Section from './Section';
import WorkerHeader from './WorkerHeader';
import ListPeople from './ListPeople';
import ReactMarkdown from 'react-markdown';

import MyIcon from './MyIcon';

import { Typography, Tabs, Tab, AppBar } from '@material-ui/core';
import Disqus from 'disqus-react';
import Language from "../Language";


function TabContainer({ children, dir }) {
	return (
		<div style={{ padding: 8 * 3 }}>
			{children}
		</div>
	);
}

@inject("store")
@observer
export default class Sections extends Component {

	constructor(props) {
		super(props);
		this.store = this.props.store;
		this.state = {
			index: 0,
			showAll: false,
			disabled: false,
			value: 0,
		}
	}
	nextprevBtn = () => {
		const { index, showAll } = this.state;
		const { sections } = this.props;
		const len = sections.length;

		return (
			<div className="flex jc mgd20">
				<button disabled={(index == 0 || showAll)} type="button" className="secondary-btn thin cta red mglr10 prevbtn" onClick={() => { this.setState({ index: index - 1 }) }}><Language resource="PREV" /></button>
				<button disabled={(index == len - 1 || showAll)} type="button" className="secondary-btn thin cta blue mglr10 nextbtn" onClick={() => { this.setState({ index: index + 1 }) }}><Language resource="NEXT" /></button>
			</div>
		)
	}
	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	render() {
		const { sections, tippers, id } = this.props;
		const len = sections.length;
		const { index, showAll } = this.state;
		const nxtP = (len > 1 && !showAll) ? this.nextprevBtn() : "";

		const disqusConfig = {
			url: window.location.href,
			identifier: `ra-${id}`,
		};

		return (
			<div>
				<AppBar className="appbar" position="static" color="default">
					<Tabs
						value={this.state.value}
						onChange={this.handleChange}
						indicatorColor="secondary"
						textColor="secondary"
						fullWidth
					>
						<Tab label={<Language resource="SEC.WORK" />} />
						<Tab label={<Language resource="SEC.DATA" />} />
						<Tab label={<Language resource="SEC.CONTRIB" />} />
						<Tab label={<Language resource="SEC.COMM" />} />
					</Tabs>
				</AppBar>
				{this.state.value === 0 &&
					<TabContainer>
						<div className="flex col">
							<div className="flex col box nopad">
								<div className="greyheader flex">
									<div className="_11"><Language resource="SEC.TASK" /></div>
									<div className="toggleButtons flex">
										<div onClick={() => { this.setState({ showAll: false }) }} className={!showAll ? "clicked" : ""}><i className="material-icons">view_carousel</i></div>
										<div onClick={() => { this.setState({ showAll: true }) }} className={showAll ? "clicked" : ""}><i className="material-icons">view_list</i></div>
									</div>
								</div>

								<div className="flex col mpad">
									{(!showAll) ?
										<Section index={index + 1} {...sections[index]} {...this.props}></Section> :
										(sections.map((o, i) => <Section key={i} index={i + 1} {...o} {...this.props}></Section>))
									}
									{nxtP}
								</div>
							</div>
						</div>
					</TabContainer>
				}
				{/*
				{this.state.value === 1 &&
					<TabContainer>
						{(isOwner) ? <button className="secondary-btn cta thin blockchainbtn" onClick={this.export} ><Language resource="SEC.EXPORT" /></button> : (<Link to="#/marketplace"><button className="secondary-btn cta thin blockchainbtn"><Language resource="SEC.GMARKET" /></button></Link>)}
					</TabContainer>
				}
			*/}
				{this.state.value === 2 &&
					<TabContainer>
						<div className="flex mpad col">
							<div className="flex greyheader algn mini">
								<div className="_11">{"Tippers"}{`· ${tippers.length}`}</div>
							</div>
							<div className="flex withwrap mpad"></div>
							{
								tippers.map(o => {
									return (
										<Link to={`${etherscan}${o}`}>
											<MyIcon title={o} id={o} scale={6} size={6} />
										</Link>
									)
								})
							}
						</div>
					</TabContainer>}

				{this.state.value === 3 &&
					<TabContainer>
						<Disqus.DiscussionEmbed config={disqusConfig} />
					</TabContainer>}
			</div>
		);
	}
}