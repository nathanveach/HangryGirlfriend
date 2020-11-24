import React from 'react';
import ReactStars from 'react-stars';


const AllBusinesses = (props) => {
	const allBusinesses = props.businesses.map ((restaurant, index) => (
		<div className="my-3" key={index}>
			<div className="card custom-card border-dark">
	      <ul className="list-unstyled">
	      	<li className="media">
	      		<a href={restaurant.url}>
	        		<img src={restaurant.image_url} className="custom-img img-thumbnail mx-1 mt-5"/>
	          </a>
	          <div className="media-body ml-3">			          	
							<a href={restaurant.url} className="btn card-title">
	            	<h5 className="mt-2">{restaurant.name}</h5>
				    	  <ReactStars
							    value={restaurant.rating}
							    count={5}
							    size={24}
									color2="#ffd700"
							    half={true}
							    edit={false}
							  />
		            <small className="text-muted ml-2">{restaurant.review_count} reviews </small>
		            <small className="text-muted ml-3">{restaurant.price}</small><br/>
	            </a>
	            <div className="my-2">
	            	<a href={"tel:" + restaurant.phone} className="unstyled">{restaurant.display_phone}</a><br/>
	            </div>
	            <a href={"https://maps.google.com/?q=" + restaurant.alias } className="unstyled">
	            	{restaurant.location.display_address[0]}.<br/>
			        	{restaurant.location.display_address[restaurant.location.display_address.length - 1]}<br/>
		            <small className="text-muted ml-2">{(restaurant.distance * .000621371).toFixed(2)} miles away</small>
	            </a>
	          </div>
	        </li>
	      </ul>
      </div>
    </div>
	));
	return(allBusinesses);
}

export default AllBusinesses;
