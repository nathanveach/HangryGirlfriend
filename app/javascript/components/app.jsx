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
	    console.log(latitude, longitude);
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
		let restaurantList;
		if (businesses) {
			restaurantList = businesses.map((restaurant, index) => (
	      <div key={index} className="col-md-6 col-lg-4">
	        <div className="card mb-4">
	          <div className="card-body">
	            <h3 className="card-title text-center">{restaurant.name}</h3>
	          </div>
	        </div>
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
					{businesses == undefined ? noRestaurants : restaurantList}
				</div>
			</div>
		);
	}
}

export default App;
