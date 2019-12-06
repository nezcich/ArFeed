import React from 'react';
import { etherscan, smartTrim } from '../../utils/constants';
import MyIcon from './MyIcon';
import { tokensByAddr } from '../../utils/tokenList.js';
import { coinLogoFromTicker } from '../../utils/constants.js';
import Language from "../Language";

const WorkerHeader = (props) => {
	const { addr, worker, canClaimAmt, canclaim, tokenAddress } = props;

	let claimedDiv = "";
	let claimedAmt = 0;
	const token = tokensByAddr[tokenAddress];

	if(worker && worker.claimedAmt){
		claimedAmt = worker.claimedAmt/(10**token.decimals);
		claimedDiv = <ClaimDiv tokenAddress={tokenAddress} amt={claimedAmt} header={<Language resource="SEC.CLAIMED" />} />
	}else if(canclaim && canClaimAmt !== undefined){
		claimedDiv = <ClaimDiv red tokenAddress={tokenAddress} amt={canClaimAmt} header={<Language resource="SEC.UNCLAIM" />} />
	}

	return (
			<div className="flex algn _11">
				<div className="explore-img">
					<a href={`${etherscan}${addr}`}>
						<MyIcon id={addr} size={7} scale={7} />
					</a>
				</div>
				<a className="upper explore-title" href={`${etherscan}${addr}`}>{smartTrim(addr, 15)}</a>
				{claimedDiv}
			</div>
		);
}
const ClaimDiv = (props) => {
		const token = tokensByAddr[props.tokenAddress];
		return (
					<div className={`claimedDiv flex algn ${props.red ? "redbg" : ""}`}>
						<div className="hit-label">{props.header}: </div>
						<div className="hit-light flex algn">
							<div className="subheader bold">{props.amt}</div>
							<div className="coin">
								{coinLogoFromTicker(token.name, 15)}
							</div>						
						</div>
					</div>
				);	
}
export default WorkerHeader;