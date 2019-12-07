import React, { Component } from "react";
import { inject, observer } from "mobx-react";
const dJSON = require('dirty-json');

@inject("store")
@observer
export default class Section extends Component {

	constructor(props) {
		super(props);
		this.store = this.props.store;

		this.state = {
			arql_response: null,
		}
	}

	fetchARQL = async () => {
		this.setState({ arql_response: null });
		const { arql } = this.props;
		const r = dJSON.parse(arql)
		const res = await this.store.nebStore.fetchARQL(r);
		this.setState({ arql_response: JSON.stringify(res) });
	}
	render() {

		const { index, sections, } = this.props;
		const section = sections[index - 1];
		const { title, arql, description } = section;

		return (
			<div className="section-div flex">
				<div className={`flex col question-box`}>
					<div className="flex algn">
						<div className="explore-title explore-index">{index}</div>
						<div className="_11 explore-title">{title}</div>
					</div>
					<div className="explore-descr">{description}</div>
					<div style={{ display: "flex" }}>
						<div title="Click to Query" onClick={this.fetchARQL} className="explore-descr explore-arql">{arql}</div>

						{this.state.arql_response !== null ? <div style={{ "maxHeight": "350px", "overflow": "auto" }} className="explore-descr explore-arql explore-arql-response">
							Number of Data Items: {Array.isArray(this.state.arql_response) ? this.state.arql_response.length : 0}<br />{this.state.arql_response}</div> : (<div style={{ "maxHeight": "350px", "overflow": "auto" }} className="explore-descr explore-arql explore-arql-response">{"Response will show here"}</div>)}
					</div>

				</div>
			</div>
		);
	}
}