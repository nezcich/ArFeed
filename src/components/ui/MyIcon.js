import React from 'react';
import Blockies from 'react-blockies';
import { stringToColour } from '../../utils/constants';

const MyIcon = (props) => {

	const { id, size, scale, title } = props;
	const color = stringToColour(id + "color");
	const bgColor = stringToColour(id + "bgColor");
	const spotColor = stringToColour(id + "spotColor");
	if (props.profile) {
		return (<div title={title} className="profile-picture" style={{ margin: "0 5px 0 0", backgroundImage: `url(${props.profile.picture})`, width: `${size * size}`, height: `${size * size}` }}></div>);
	}
	return (
		<Blockies
			className="my-icon"
			seed={id || "a"}
			size={size}
			scale={scale}
			color={color}
			bgColor={bgColor}
			spotColor={spotColor}
		/>
	)
}
export default MyIcon;