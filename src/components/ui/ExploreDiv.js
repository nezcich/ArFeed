import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Sections from './Sections';
import TaskHeader from './TaskHeader';


@inject("store")
@observer
export default class ExploreDiv extends Component {
	constructor(props) {
		super(props);
		this.store = props.store;
	}
	render() {
		return (
			<div className={`explore-div expand`}>
				<div className="flex col">
					<TaskHeader {...this.props} />
					<Sections {...this.props} />
				</div>
			</div>
		);
	}

}