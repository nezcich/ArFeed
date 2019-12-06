import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import RadioButton from './RadioButton';
import TextareaAutosize from 'react-autosize-textarea';
import Language from "../Language";

@inject("store")
@observer
export default class BHitSection extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}
	render() {
		const { index } = this.props;
		const { createHitState } = this.store;
		const { hittype, title, column_name, arql, description, link, answers, rewardAmount, fee, selfMine, radioCheck } = this.props;

		let header = "";
		let opts = "";
		if (hittype == 1 || hittype == 2) {
			opts = (
				<div className="flex col">
					<div className="hit-label"><Language resource="OPTION" /></div>
					{answers.map((o, i) => {
						return (<input key={i} type="text" value={o} placeholder={`Option #${i + 1}`} onChange={(e) => { createHitState.setSubAnswerLabel(index, i, e.target.value) }} />);
					})}
					<button type="button" className="secondary-btn cta thin" onClick={(e) => { createHitState.addAnswerLabel(index) }} ><Language resource="SIDE.ADD_OPT" /></button>
				</div>
			)
		}
		switch (hittype) {
			case 0:
				header = <Language resource="SIDE.TEXT" />;
				opts = (null);
				break;
			case 1:
				header = <Language resource="SIDE.CHOICE_SINGLE" />;
				break;
			case 2:
				header = <Language resource="SIDE.CHOICE_MULTI" />;
				break;
			case 3:
				header = <Language resource="SIDE.ANN" />;
				opts = (null);
				break;
		}
		return (
			<div style={this.props.style}>
				<div className="flex algn">
					<h3 style={{ marginRight: "10px" }}>{index}</h3>
					<div className="subheader bold">{header}</div>
				</div>
				<div className="hit-label"><Language resource="SIDE.TITLE" /></div>
				<input className="hit-question full" type="text" value={title} onChange={(e) => { createHitState.setSubTitle(index, e.target.value) }} />


				<div className="hit-label"><Language resource="DESCR" /> <span className="hit-light"><Language resource="SIDE.OPT" /></span></div>
				<TextareaAutosize className="hit-descr full" value={description} onChange={(e) => { createHitState.setSubDescription(index, e.target.value) }} />


				<div className="hit-label"><Language resource="SIDE.ARQL" /></div>
				<TextareaAutosize className="hit-descr full" value={arql} onChange={(e) => { createHitState.setSubARQL(index, e.target.value) }} />


				<div className="hit-options">
					{opts}
				</div>
			</div>
		);
	}

}