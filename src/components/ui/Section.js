import React, { Component } from "react";
import { inject, observer } from "mobx-react";

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
		const { arql } = this.props;

		console.log(arql);
		console.log(JSON.stringify(arql, undefined, 4));
		console.log(arql instanceof String);
		console.log(arql instanceof Object);
		const res = await this.store.nebStore.fetchARQL(arql);
		this.setState({ arql_response: res });

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
					<div onClick={this.fetchARQL} className="explore-descr explore-arql">{arql}</div>

					{this.state.arql_response !== null ? <div className="explore-descr explore-arql explore-arql-response">{arql_response}</div> : (null)}

				</div>
			</div>
		);
	}
}