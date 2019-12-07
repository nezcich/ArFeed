import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { etherscan, smartTrim } from '../../utils/constants.js';
import Section from './Section';

import MyIcon from './MyIcon';

import { Card, CardContent, Tabs, Tab, AppBar } from '@material-ui/core';
import Disqus from 'disqus-react';
import Language from "../Language";
import moment from "moment";
import LinearProgress from '@material-ui/core/LinearProgress';

import { Bar } from 'react-chartjs-2';

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
			stats: null,
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
	componentDidUpdate() {
		this.fetchStats();
	}
	fetchStats = async () => {
		if (this.state.value == 1 && this.state.stats == null) {
			const txs = await this.store.nebStore.fetchAllTx(this.props.wallet);

			if (txs.length > 0) {
				let max = 30;
				let stamps = await Promise.all(txs.slice(0, max).map(async o => {
					let t = await this.store.nebStore.fetchTimestamp(o)
					var date = new Date(t * 1000);
					return date.getHours();
				}));
				//frequency calculate
				var freq = stamps.reduce((acc, curr) => {
					acc[curr] ? acc[curr]++ : acc[curr] = 1;
					return acc;
				}, {});

				var dataset = [...Array(24).keys()].map(o => {
					if (freq[o]) {
						return freq[o]
					} else {
						return 0;
					}
				});


				this.setState({
					stats: [
						{ title: "Total Transactions", content: txs.length },
						{ title: "Last Transaction", content: <a href={`${etherscan}${txs[0]}`}>{smartTrim(txs[0], 15)} - {moment(await this.store.nebStore.fetchTimestamp(txs[0]) * 1000).fromNow()}</a> },
						{ title: "First Transaction", content: <a href={`${etherscan}${txs[txs.length - 1]}`}>{smartTrim(txs[txs.length - 1], 15)} - {moment(await this.store.nebStore.fetchTimestamp(txs[txs.length - 1]) * 1000).fromNow()}</a> },
						{
							title: "Feed Transactions", content: <Bar
								width={100}
								height={500}
								options={{ maintainAspectRatio: false }}
								data={{
									labels: [...Array(24).keys()],
									datasets: [
										{
											label: 'Transactions Every Hour (last 30)',
											backgroundColor: 'rgba(255,99,132,0.2)',
											borderColor: 'rgba(255,99,132,1)',
											borderWidth: 1,
											hoverBackgroundColor: 'rgba(255,99,132,0.4)',
											hoverBorderColor: 'rgba(255,99,132,1)',
											data: dataset
										}
									]
								}}
							/>,
							noblock: true,
						},
					]
				})
			} else {
				this.setState({ stats: [{ title: "Total Transactions", content: txs.length },] });
			}
		}
	}
	render() {
		const { sections, tippers, id } = this.props;
		const len = sections.length;
		const { index, showAll } = this.state;
		const nxtP = (len > 1 && !showAll) ? this.nextprevBtn() : "";

		const disqusConfig = {
			url: "https://arweave.net/",
			identifier: `arweave-${id}`,
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
				{this.state.value === 1 &&
					<TabContainer>
						{this.state.stats == null ?
							<LinearProgress color="secondary" /> : this.state.stats.map(o => {
								return (<ACard content={o.content} title={o.title} noblock={o.noblock} />)
							})}
					</TabContainer>
				}
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
										<a href={`${etherscan}${o}`} style={{ displat: "inline-block" }}>
											<MyIcon title={o} id={o} scale={6} size={6} />
										</a>
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
const ACard = (props) => {
	var display = props.noblock ? "block" : "inline-block";
	return (
		<Card style={{ display: display, margin: "20px" }}>
			<CardContent>
				<h3 style={{ fontWeight: "bold", fontSize: "18px" }}>{props.title}</h3>
				<div style={{ padding: "10px 0", color: "#575757" }}>{props.content}</div>
			</CardContent>
		</Card>
	);
}