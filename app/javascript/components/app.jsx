import React from 'react';
import ReactStars from 'react-rating-stars-component';


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
	      lng: longitude
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
			<h4 className="text-center">IS YOUR GIRL GETTING HANGRY?! QUICK PUSH THE EFFING BUTTON!!</h4>
		);
		// declare variables so they do not come up as undefined in initial render
		let restaurantList,
				randomBusiness,
				arr = [];

		if (businesses) {
			// this is how you random select from an array with javascript
			randomBusiness = businesses[Math.floor(Math.random() * businesses.length)];
			// react wont accept an objects as a react child? so I initialized an array to fill with one value to map over instead..
			arr.push(randomBusiness);
			const reactStars = (
    	  <ReactStars
			    value={randomBusiness.rating}
			    count={5}
			    size={24}
					activeColor="#ffd700"
			    isHalf={true}
			    edit={false}
			  />
			);

			restaurantList = arr.map((restaurant, index) => (
				<div key={index}>
					<div className="card custom-card border-dark">
			      <ul className="list-unstyled">
			      	<li className="media">
			      		<a href={restaurant.url}>
			        		<img src={restaurant.image_url} className="custom-img img-thumbnail mx-1 mt-5"/>
			          </a>
			          <div className="media-body ml-3">			          	
									<a href={restaurant.url} className="btn">
			            	<h5 className="mt-2">{restaurant.name}</h5>
			            </a>
			             	{reactStars}
			            <small className="text-muted ml-2">{restaurant.review_count} reviews </small>
			            <small className="text-muted ml-3">{restaurant.price}</small>
			            <p className="mt-2">{restaurant.display_phone}</p>
			            <p>{restaurant.location.display_address[0]}.<br/>
			            {restaurant.location.display_address[restaurant.location.display_address.length - 1]}</p>
			          </div>
			        </li>
			      </ul>
		      </div>
	      </div>
	    ));
	  }

		

		return (
			<div className="container">
				<div className="my-4 text-center">
					<img src="https://i.ibb.co/x2XH4s1/image-1.png" className="img-fluid"/>
				</div>
				<form onSubmit={this.onSubmit}>
					<input type="hidden" value={this.state.lat} name="lat"/>
					<input type="hidden" value={this.state.lng} name="lng"/>				
					<div className="row mt-5">
						<div className="col-md-6 offset-md-3">
							{businesses == undefined ? noRestaurants : restaurantList}
						</div>
					</div>
					<div className="row">
						<div className="col">
							<button type="submit" className="red-button mt-5"></button>
						</div>
					</div>	
				</form>
				<div className="meme text-center">
					<img src="https://pics.me.me/when-you-try-talking-to-your-girl-while-shes-hungry-22638275.png" className="img-fluid my-1"/>
					<img src="https://lh3.googleusercontent.com/proxy/_knmRgWj-HQRbhRJNSa6RmEOPSakQTIvjvQA6qgo27WtLb1NLnlHLjbSUo_a7N94euPVY3oofg08CnnxcY4R3tOOHNvcn4uKH9-XUhQB6CvzK7-2NNJpsSc0BFFqU0ahOis_zgP3kaY-wKM31_37q5nOK75yTg-Yu40" className="img-fluid my-1"/>
					<img src="https://i.ytimg.com/vi/dwu8qM2RqnQ/hqdefault.jpg" className="img-fluid my-1"/>
					<img src="https://i.pinimg.com/originals/06/37/89/063789a5a3acff3ad1417c68be01acf0.jpg" className="img-fluid my-1"/>
					<img src="https://i.pinimg.com/originals/53/12/e3/5312e32cf54a04b35388583c335aeca8.jpg" className="img-fluid my-1"/>
					<img src="" className="img-fluid"/>
					<img src="" className="img-fluid"/>
					<img src="" className="img-fluid"/>
				</div>
			</div>
		);
	}
}

export default App;
