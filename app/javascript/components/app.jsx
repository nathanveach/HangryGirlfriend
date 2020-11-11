import React from 'react';
import ReactStars from 'react-stars';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: 0,
			lng: 0,
			businesses: [],
			term: "restaurant",
			count: 0,
			submitted: false
		};

		this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
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
	    alert("Default location set to San Francisco.")
	  };

	  navigator.geolocation.getCurrentPosition(success, error);
	}

	onClick(){
		this.setState({submitted: false})
	}

	onChange(event) {
		this.setState({	[event.target.name]: event.target.value });
	}


	onSubmit(event) {
		event.preventDefault();
		const url = "/search";
		const { lat, lng, term } = this.state;

		const body = {
			lat,
			lng,
			term
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
			.then(response => this.setState({
										businesses: response,
										submitted: true,
										count: this.state.count += 1
									}))
			.catch(error => console.log(error.message));
	}


	render() {
		const {businesses} = this.state.businesses;

		const noRestaurants = (
			<h4 className="text-center">IS YOUR GIRL GETTING HANGRY?! DON'T KNOW WHERE TO EAT!?! QUICK PUSH THE EFFING BUTTON!!
				<br/><br/><br/><br/>
			</h4>
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
			if (this.state.submitted){
				restaurantList = arr.map((restaurant, index) => (
					<div key={index}>
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
				            	<p>{restaurant.location.display_address[0]}.<br/>
				            {restaurant.location.display_address[restaurant.location.display_address.length - 1]}</p>
				            </a>
				          </div>
				        </li>
				      </ul>
			      </div>
		      </div>
		    ));
			} else {
		  	restaurantList = (
		  		<div><br/><br/><h1 className="text-danger text-center">{this.state.term}</h1><br/><br/></div>
		  	)
			}
	  }

	  const searchTerm = (
	  	<div className="form-group">
	  		<label className="font-weight-bold">Is she really being picky and hangry?? Try a search term:</label>
	  		<input 
	  			type="text"
	  			className="form-control"
	  			name="term"
	  			placeholder="Sushi.. Pizza.. Mexican.. Goodluck bro!!"
	  			onChange={this.onChange}
	  			onClick={this.onClick}
	  			/>
	  	</div>
	  	)
		

		return (
			<div className="container">
				<div className="my-4 text-center">
					<img src="https://i.ibb.co/JK14mVn/image-2.png" className="img-fluid"/>
				</div>
				<form onSubmit={this.onSubmit}>
					<input type="hidden" value={this.state.lat} name="lat"/>
					<input type="hidden" value={this.state.lng} name="lng"/>				
					<div className="row mt-5">
						<div className="col-md-6 offset-md-3">
								{businesses == undefined ? noRestaurants : restaurantList}
							<div className="mt-3">
							  {this.state.count > 2 ? searchTerm : null}
							</div>
						</div>
					</div>	
						<button type="submit" className="red-button mt-5"></button>
				</form>
				<div className="meme text-center">
					<img src="https://i.ibb.co/ysJMt1C/memeeee.jpg" className="img-fluid my-1"/><br/>
					<img src="https://i.pinimg.com/originals/06/37/89/063789a5a3acff3ad1417c68be01acf0.jpg" className="img-fluid my-1"/><br/>
					<img src="https://i.ytimg.com/vi/dwu8qM2RqnQ/hqdefault.jpg" className="img-fluid my-1"/><br/>
					<img src="https://pics.me.me/when-you-try-talking-to-your-girl-while-shes-hungry-22638275.png" className="img-fluid my-1"/><br/>
					<img src="https://i.pinimg.com/originals/53/12/e3/5312e32cf54a04b35388583c335aeca8.jpg" className="img-fluid my-1"/><br/>					
				</div>
			</div>
		);
	}
}

export default App;
