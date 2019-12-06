import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { etherscan } from '../utils/constants';
import { storeOnIPFS, getFromIPFS } from '../services/ipfsService';
import { parseXRBAccount } from '../utils/xrb_general';
import { Link } from "react-router-dom";
import TaskList from './ui/TaskList';
import UnlockMeta from './ui/UnlockMeta';
import Language from "./Language";

@inject("store")
@observer
export default class Account extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;

		this.state = {
			tasksJobber: [],
			tasksMiner: [],
			tasksOwner: [],
		};
	}
	componentDidMount(){
		this.explorePosts();
	}
	explorePosts = async() => {
		if(this.store.appState.authenticated){
			this.store.nebStore.getTasks(this.store.appState.address, 1).then(out=>{
				this.setState({ tasksJobber: out });
			});
			this.store.nebStore.getTasks(this.store.appState.address, 2).then(out=>{
				this.setState({ tasksMiner: out });
			});
			this.store.nebStore.getTasks(this.store.appState.address, 3).then(out=>{
				this.setState({ tasksOwner: out });
			});
		}else{
			setTimeout(()=>{ this.explorePosts() },3000)
		}
	}
	render() {
		const { authenticated, address, miner, profile } = this.store.appState;
		const { tasksJobber, tasksMiner, tasksOwner } = this.state;

		const thead = (
			<div className="explore-div flex algn">
				<div className="col1"><Language resource="THEAD.REQ" /></div>
				<div className="col2"><Language resource="SIDE.TITLE" /></div>
				<div className="col3"><Language resource="THEAD.ADD" /></div>
				<div className="col3"><Language resource="THEAD.EXP" /></div>
				<div className="col3"><Language resource="THEAD.WORK" /></div>
				<div className="col3"><Language resource="SIDE.REWARD" /></div>
				<div className="col3"><Language resource="SIDE.FEE" /></div>
			</div>			
		)
		return (
			<div className="page account">
			{(!authenticated) ? (<UnlockMeta />):
				(
					<div className="flex col">
						<div className="flex col box">
							<div className="subheader mini light"><Language resource="ACC.HEADER" /></div>
							{ profile ? 
								<div className="flex col">
									<div className="flex algn"><div className="profile-picture" style={{backgroundImage: `url(${profile.picture})`}}></div><div>{profile.name}</div></div>
									<div className="flex algn mpad"><div className="bold"><Language resource="ACC.EMAIL" />: </div><a href={`mailto:${profile.email}`} target="_blank">{profile.email}</a></div>
								</div>
								: (null)
							}
							<div className="flex algn mpad"><div className="bold"><Language resource="ACC.ADDR" />: </div><a href={`${etherscan}${address}`} target="_blank">{address}</a></div>
							<div className="flex algn mpad"><div className="bold"><Language resource="ACC.VLVL" />: </div><div>{miner.level}</div></div>
							<div className="flex algn mpad"><div className="bold"><Language resource="ACC.VCOMP" />: </div><div>{miner.miningCount}</div></div>
							<div className="flex algn mpad"><div className="bold"><Language resource="ACC.RCOUNT" />: </div><div>{tasksOwner.length}</div></div>
							<div className="flex algn mpad"><div className="bold"><Language resource="ACC.WCOUNT" />: </div><div>{tasksJobber.length}</div></div>
						</div>

						{ExplorePrint(tasksJobber, <Language resource="ACC.TCOMP" />)}
						{ExplorePrint(tasksMiner, <Language resource="ACC.VCOMP" />, true)}
						{ExplorePrint(tasksOwner, <Language resource="ACC.MTASK" />)}
					</div>
				)
			}
			</div>
		);
	}
}

const ExplorePrint = (tasks, header, thead, mine = false) => {
	let link = "/task";
	if(mine){
		link = "/verification/verify";
	}

	if(tasks.length == 0){
		return (null);
	}
	const tbody = [];
	tasks.map( (o,i)=>{
		tbody.push(
			<Link key={i} to={`${link}/${o.addr}`}>
				<TaskList {...o} />
			</Link>
			)
	});

	return (
	<div className="flex col">
		<div className="greyheader">{header}</div>
		<div className="flex col box nopad tlist">			
		{thead}{tbody}
		</div>
	</div>
	);
}