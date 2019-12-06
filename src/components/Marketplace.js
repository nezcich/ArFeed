import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import LinearProgress from '@material-ui/core/LinearProgress';
import Market from './ui/Market.js';
import { ytcsv } from '../utils/csv.js';
import { getColor, etherscan, coinLogoFromTicker, stringToColour, smartTrim } from '../utils/constants.js';
import * as CryptoIcon from 'react-cryptocoins';

@inject("store")
@observer
export default class Marketplace extends Component {
	constructor(props) {
		super(props);
		this.store = props.store;
		
		this.state = {
			tasks: [],
			showData: false,
			addr: false,
		};		
	}	
	componentDidMount(){
		this.explorePosts();
	}
	explorePosts = async() => {
		if(this.store.appState.authenticated){
			this.store.nebStore.getTasks(0, 0, false).then(out=>{
				console.log(out)
				this.setState({ tasks: out });
			});
		}else{
			setTimeout(()=>{ this.explorePosts() },3000)
		}
	}
	hideCSV = () => {
		this.setState({ showData: false, addr:"" });
	}
	showCSV = (addr) => {
		if(addr == "0x6c727f2721faf880bdcc10608c6c8b6f86d51f0a"){
			this.setState({ showData: true, addr });
		}else{
			this.store.appState.showMsg("Not available on this version");
		}
	}
	render(){
		const { tasks, showData, addr } = this.state;
		const header = "Marketplace";
		if(tasks.length == 0){
			return (
				<div className="page explore">
					<div className="box subheader"><LinearProgress color="secondary" /></div>
				</div>
				)
		}

		return (
			<div className="page explore">
				<div className="greyheader">{header}</div>
				<div className="flex fwrap">
					{
						tasks.map( (o,i)=>{
							return (
								<Market key={i} index={i} {...this.props} {...o} onClick={()=>{ this.showCSV(o.addr) }} />
							)
						})
					}
				</div>
				{showData ? 
					<div className="flex col market-demo">
						<div className="market-header flex algn"><div className="_11">Preview</div><i onClick={()=>{ this.hideCSV() }} className="material-icons">clear</i></div> 
						<div className="market-demotxt">{ytcsv}</div>
						<div className="market-footer flex algn">
							<div className="_11">
								<div className="flex fwrap">
									<div className="hit-light flex algn">
										<div className="subheader bold">{ (addr.replace(/\D/g,'')).substring(3,5) }</div>
										<div className="coin">
											{coinLogoFromTicker("RAI", 15)}
										</div>						
									</div>		
								</div>

							</div>
							<button onClick={()=>{ this.showCSV("") }} className="req-button"><div className="req-logo"><div className="reqimg"></div></div><div className="req-text">Buy all Data</div></button>
						</div>
					</div> 
				: (null)
				}
			</div>
			)
	}
}