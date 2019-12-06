import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import  { Link } from 'react-router-dom';
import MyIcon from './MyIcon';
import { smartTrim } from '../../utils/constants.js';
import { getFromIPFS } from '../../services/ipfsService.js';


@inject("store")
@observer
class ListPeople extends React.Component{
	constructor(props){
		super(props);
		this.store = this.props.store;
	}
	render(){
		const {header, people, type, t, addr, user_address, isOwner}  = this.props;

		if(people.length == 0){
			return (null);
		}
		return(
			<div className="flex mpad col">
				<div className="flex greyheader algn mini">
					<div className="_11">{header}{`· ${people.length}`}</div>
				</div>
				<div className="flex withwrap mpad">
					{people.map((o,i)=>{
						let link;
						switch(t){
							case 'verify':
								link = `/task/${addr}/${user_address || this.store.appState.address}/${o}`
							break;
							case 'worker':
								if(type== "verify"){
									link = `/verification/verify/${addr}/${o}`
								}else{
									link = `/task/${addr}/${o}`
								}
							break;
						}				
						const name = o.profile ? o.profile.name : smartTrim(o, 8);
						return (
							<Link key={i} to={link}>
								<MyIcon title={name} profile={o.profile} id={o} scale={6} size={6} />
							</Link>
						)
						})
					}
				</div>			
			</div>
		)
	}
}
export default ListPeople;
