import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
class RadioButton extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const { obj, isCheckBox, disabled, noflex } = this.props;
		if(!obj){
			return (null)
		}
		let cl = "flex fwrap";
		if(noflex)cl="";
		return(
			<div className={`Radio-group ${cl}`}>
				{obj.map( (o,i)=>{
					let cl = "", icon="";
					if(o.selected){
						cl += " selected ";
					}
					if(isCheckBox){
						cl += " isCheckBox ";
					}
					if(disabled){
						cl += " nopointer ";
					}
					if(isCheckBox){
						icon = (<i className="material-icons">check_box_outline_blank</i>);
						if(o.selected){
							icon = (<i className="material-icons">check_box</i>);
						}
					}else{
						icon = (<i className="material-icons">radio_button_unchecked</i>);
						if(o.selected){
							icon = (<i className="material-icons">radio_button_checked</i>);
						}
					}
					return (
						<button key={i} className={`Radio-button ternary-btn cta ${cl}`} onClick={(e)=>{
							this.props.onClick(i);
						}}>{icon}<span className="_11">{o.label}</span></button>
					)
				})}
			</div>
		)
	}
}
export default RadioButton;
