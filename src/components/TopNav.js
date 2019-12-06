import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Route, Link } from "react-router-dom";
import ActiveLink from "./ui/ActiveLink";
import packagejson from '../../package.json';
import Language from "./Language";

@inject("store")
@observer
export default class TopNav extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store.appState;
	}

	authenticate(e) {
		if (e) e.preventDefault();
		this.props.store.authenticate();
	}

	render() {
		const { authenticated } = this.store;
		return (
			<nav>
				<div className="flex algn mglr20 iconheader">
					<div className="My-Icon"></div>
					<a href=""><Language resource="SITENAME" /><span className="betatxt">v{packagejson.version}</span></a>
				</div>
				<ActiveLink activeOnlyWhenExact={true} to="/"><i className="material-icons">create</i><Language resource="BAR.CREATE" /></ActiveLink>
				<ActiveLink activeOnlyWhenExact={true} to="/explore"><i className="material-icons">work</i><Language resource="BAR.WORK" /></ActiveLink>
			</nav>
		);
	}
}
