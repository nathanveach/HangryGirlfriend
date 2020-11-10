import React from 'react';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: 0,
			lng: 0,
			businesses: []
		};
		this.onSubmit = this.onSubmit.bind(this);
	}


	componentDidMount() {
	  const success = position => {
	    const latitude = position.coords.latitude;
	    const longitude = position.coords.longitude;
	    this.setState({
	      lat: latitude,
	      lng: longitude,
	      businesses: []
	    });
	  };

	  const error = () => {
	    console.log("Unable to retrieve your location");
	  };

	  navigator.geolocation.getCurrentPosition(success, error);
	}

	onSubmit(event) {
		event.preventDefault();
		const url = "/search";
		const { lat, lng } = this.state;

		const body = {
			lat,
			lng
		};
		const token = document.querySelector('meta[name="csrf-token"]').content;
		fetch(url, {
			method: "POST",
			headers: {
				"X-CSRF-Token": token,
      	"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok.");
			})
			.then(response => this.setState({businesses: response}))
			.catch(error => console.log(error.message));
	}


	render() {
		const {businesses} = this.state.businesses;

		const noRestaurants = (
			<h4>PRESS DA BUTTON!!</h4>
		);
		// declare variables so they do not come up as undefined in initial render
		let restaurantList,
				randomBusiness;
				arr = []

		if (businesses) {
			randomBusiness = businesses[Math.floor(Math.random() * businesses.length)];
			arr.push(randomBusiness);
			restaurantList = arr.map((restaurant, index) => (
				<div className="card" key={index}>
		      <ul className="list-unstyled">
		      	<li className="media">
		        	<img src={restaurant.image_url} className="custom-img img-thumbnail mr-3"/>
		          <div className="media-body">
		            <h3 className="text-center">{restaurant.name}</h3>
		            <p><b>Rating: </b>{restaurant.rating}</p>
		            <p><b>Price: </b>{restaurant.price}</p>
		            <p><b>Phone #: </b>{restaurant.display_phone}</p>
		            <p><b>Address: </b>{restaurant.location.display_address}</p>
		          </div>
		        </li>
		      </ul>
	      </div>
	    ));
	  }

		

		return (
			<div className="container">
				<form onSubmit={this.onSubmit}>
					<input type="hidden" value={this.state.lat} name="lat"/>
					<input type="hidden" value={this.state.lng} name="lng"/>
					<button type="submit">TEST</button>	
				</form>
				<div className="row">
					<div className="col-md-8 offset-md-2">
						{businesses == undefined ? noRestaurants : restaurantList}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
