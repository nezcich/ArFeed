import React from 'react';
var ModelViewer = require('metamask-logo');

export default class UnlockMeta extends React.Component{
	componentDidMount(){

		var viewer = ModelViewer({

		  // Dictates whether width & height are px or multiplied
		  pxNotRatio: true,
		  width: 500,
		  height: 400,
		})
		
		var container = document.getElementById('metamask-container')
		container.appendChild(viewer.container)

		// look at something on the page
		viewer.lookAt({
		  x: 100,
		  y: 100,
		})

		// enable mouse follow
		viewer.setFollowMouse(true)
	}
	render(){
		return (
			<div className="top flex algn">
				<div id="metamask-container"></div>
				<div className="subheader bold">Unlock metamask and connect to Rinkeby Network</div>
			</div>
		);
	}
}

