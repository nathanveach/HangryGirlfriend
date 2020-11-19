import React, { useEffect } from 'react';


const Geolocator = props => {


	useEffect(() => {
	  const success = position => {
	    const latitude = position.coords.latitude;
	    const longitude = position.coords.longitude;
	    props.setLocation(latitude, longitude);
	  };

	  const error = () => {
	    alert("Default location set to San Francisco.")
	  };

	  navigator.geolocation.getCurrentPosition(success, error);

	}, []);

	return(null);
}

export default Geolocator;
