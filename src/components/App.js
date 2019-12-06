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
					path="/task/:address"
					render={props => (
						<LazyRoute {...props} component={import("./Task")} />
					)}
				/>
				<Route
					exact
					path="/verification/:type/:address"
					render={props => (
						<LazyRoute {...props} component={import("./Task")} />
					)}
				/>
				<Route
					exact
					path="/verification/:type/:address/:user_address"
					render={props => (
						<LazyRoute {...props} component={import("./Task")} />
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
					path="/explore/:type"
					render={props => (
						<LazyRoute {...props} component={import("./Explore")} />
					)}
				/>
				<Route
					exact
					path="/task/:address/:user_address"
					render={props => (
						<LazyRoute {...props} component={import("./Task")} />
					)}
				/>
				<Route
					exact
					path="/task/:address/:user_address/:miner_addr"
					render={props => (
						<LazyRoute {...props} component={import("./Task")} />
					)}
				/>
				<Route
					exact
					path="/tasks/tx/:tx_hash"
					render={props => (
						<LazyRoute {...props} component={import("./Task")} />
					)}
				/>
				<Route
					exact
					path="/tasks/tx/:tx_hash/:address/:user_address"
					render={props => (
						<LazyRoute {...props} component={import("./Task")} />
					)}
				/>
				<Route
					exact
					path="/tasks/tx/:tx_hash/:address/:user_address/:miner_addr"
					render={props => (
						<LazyRoute {...props} component={import("./Task")} />
					)}
				/>
				<Route
					exact
					path="/marketplace"
					render={props => (
						<LazyRoute {...props} component={import("./Marketplace")} />
					)}
				/>
			</div>
		);
	}
}
