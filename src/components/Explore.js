import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";

import ExploreDiv from './ui/ExploreDiv';
import TaskList from './ui/TaskList';

import { Link } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import UnlockMeta from './ui/UnlockMeta';
import Language from "./Language";


function dynamicSort(property) {
	var sortOrder = 1;
	if (property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a, b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
}
@inject("store")
@observer
export default class Explore extends Component {

	constructor(props) {
		super(props);
		this.store = this.props.store;

		this.state = {
			tasks: [],
			order: true,
		};
	}
	componentDidMount() {
		this.feeds();
	}
	feeds = async () => {
		const t = await this.store.nebStore.fetchFeeds();
		this.setState({ tasks: t })
	}

	sortBy = (suffix) => {
		var x = this.state.tasks;
		var prefix = this.state.order ? "-" : "";
		x.sort(dynamicSort(`${prefix}${suffix}`));
		this.setState({ tasks: x, order: !this.state.order });
	}
	render() {
		const { tasks } = this.state;

		if (tasks.length == 0) {
			return (
				<div className="page explore">
					<div className="box subheader"><LinearProgress color="secondary" /></div>
				</div>
			)
		}
		//if(!expand){
		const thead = (
			<div className="explore-div flex algn">
				<div style={{ padding: "0 4px" }}><Language resource="THEAD.VOTE" /></div>
				<div className="col1" onClick={() => { this.sortBy("owner") }}><Language resource="THEAD.AUTHOR" /></div>
				<div className="col2" onClick={() => { this.sortBy("title") }}><Language resource="SIDE.TITLE" /></div>
				<div className="col3" onClick={() => { this.sortBy("startedOn") }}><Language resource="THEAD.CREATED" /></div>
				<div className="col3" onClick={() => { this.sortBy("balance") }}><Language resource="THEAD.BAL" /></div>
				<div className="col3" onClick={() => { this.sortBy("tips") }}><Language resource="THEAD.TIPS" /></div>
			</div>
		)
		const tbody = [];
		tasks.map((o, i) => {
			tbody.push(
				<Link key={i} to={`tasks/tx/${o.id}`}>
					<TaskList {...this.props} {...o} />
				</Link>
			)
		});

		return (
			<div className="page explore">
				<div className="greyheader flex algn"><div className="_11">Explore</div><Link to="#/"><button className="secondary-btn cta thin newbtn"><Language resource="NEW" /></button></Link></div>
				<div className="flex col box nopad tlist">
					{thead}{tbody}
				</div>
			</div>
		);
		/*
	}
	return (
		<div className="page explore">
			<div className="greyheader">{header}</div>
			<div className="flex col box nopad">
				{
					tasks.map( (o,i)=>{
						return (
							<Link key={i} to={`${link}/${o.addr}`}>
								<ExploreDiv {...this.props} {...o} type={type} />
							</Link>
						)
					})
				}
			</div>
		</div>
	);
	*/
	}
}