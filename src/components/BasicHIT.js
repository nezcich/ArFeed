import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import BHitDisplay from './ui/BHitDisplay.js';
import Dropzone from 'react-dropzone'

import { Divider } from '../utils/constants.js';
import toBuffer from 'blob-to-buffer';
import Language from "./Language";

@inject("store")
@observer
export default class BasicHIT extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
		this.state = {
			imageurl: "",
		}
	}
	handleChange = (selectedOption) => {
		this.store.createHitState.setTokenAddress(selectedOption.value);
	}
	onDrop = (files) => {
		const { createHitState } = this.store;
		const file = files[0];
		var ipfs = window.IpfsApi('ipfs.infura.io', '5001', { protocol: 'https' });

		toBuffer(file, (err, buf) => {
			if (err) {
				console.log("Error Reading Buffer");
				return false;
			}
			ipfs.files.add({
				path: file.name,
				content: buf
			}, (err, res) => {
				if (err) {
					console.log("Error Occured Uploading");
					return false;
				}
				const hash = res[0].hash;
				createHitState.setCover(hash);
				this.setState({ imageurl: `https://ipfs.infura.io/ipfs/${hash}` });
			});
		});
	}
	render() {
		const { createHitState } = this.store;
		const { title, description, tokenAddress, rewardAmount, fee, confirmations, radio, selfMine, sections, tags } = createHitState;
		const { imageurl } = this.state;
		return (
			<div className="flex">
				<div className="hit">
					<div onClick={() => { createHitState.setSidebarIndex(0) }}>
						<Dropzone multiple={false} className="cover-dropzone" onDrop={this.onDrop}>
							<i className="material-icons">photo</i>
							<div className="fullHW" style={{ backgroundImage: `url(${imageurl})` }}></div>
						</Dropzone>
						<input className="hit-title full large" type="text" value={title} placeholder="Feed Title" onChange={(e) => { createHitState.setTitle(e.target.value) }} />
						<Divider />
					</div>
					<div className="flex col">
						{sections.length == 0 ? (<div className="hit-section selected"><p style={{ padding: "30px", color: "#98b8d4" }}><Language resource="HOME.ADD" /></p></div>) : (null)}
						{sections.map((o, i) => {
							return (<BHitDisplay key={i} index={i + 1} {...o} selfMine={selfMine} />)
						})}
					</div>
				</div>
			</div>
		);
	}
}