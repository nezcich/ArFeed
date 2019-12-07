import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LazyRoute from "lazy-route";
import DevTools from "mobx-react-devtools";

import TopBar from "./TopBar";
import TopHeader from "./TopHeader";
import { Snackbar } from '@material-ui/core';

@withRouter
@inject("store")
@observer
export default class App extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}
	componentDidMount() {
		this.store.appState.connectMetamask();
	}
	render() {
		const {
			authenticated,
			snackmsg,
			snackopen,
		} = this.store.appState;
		return (
			<div className="wrapper">
				{/*<DevTools />*/}
				<TopBar />
				<TopHeader />
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					open={snackopen}
					onClose={this.store.appState.handleClose}
					SnackbarContentProps={{
						'aria-describedby': 'message-id',
					}}
					message={<span id="message-id">{snackmsg}</span>}
				/>
				<Route
					exact
					path="/"
					render={props => (
						<LazyRoute {...props} component={import("./Home")} />
					)}
				/>
				<Route
					exact
					path="/account"
					render={props => (
						<LazyRoute {...props} component={import("./Account")} />
					)}
				/>
				<Route
					exact
					path="/explore"
					render={props => (
						<LazyRoute {...props} component={import("./Explore")} />
					)}
				/>
				<Route
					exact
					path="/feeds/tx/:tx_hash"
					render={props => (
						<LazyRoute {...props} component={import("./Task")} />
					)}
				/>
			</div>
		);
	}
}
