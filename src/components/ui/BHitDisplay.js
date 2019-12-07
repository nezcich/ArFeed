import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
export default class BHitDisplay extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}
	render() {
		const { index } = this.props;
		const { createHitState } = this.store;
		const { title, description, arql } = this.props;


		const cl = (createHitState.sideBarIndex == index) ? "selected" : "";

		return (
			<div className={`hit-section ${cl}`} onClick={() => { createHitState.setSidebarIndex(index) }}>
				<div className="flex algn">
					<div className="_11 explore-title">{title}</div>
					<button type="button" className="secondary-btn cta red thin" onClick={(e) => { createHitState.removeSection(index) }} ><i className="material-icons">delete</i></button>
				</div>

				<div className="explore-descr">{description}</div>
				<div className="explore-descr explore-arql">{arql}</div>
			</div>
		);
	}

}