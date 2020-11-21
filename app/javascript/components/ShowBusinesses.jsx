import React from 'react';
import RandomBusiness from './RandomBusiness';
import TitleBody from './TitleBody';


const ShowBusinesses = (props) => {	
	const {businesses} = props.businesses;
	
	return(
		<div>
			{businesses == undefined ? <TitleBody/> : <RandomBusiness businesses={businesses}/>}
		</div>
	);
}

export default ShowBusinesses;
