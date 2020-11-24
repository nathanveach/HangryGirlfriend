import React from 'react';
import ReactStars from 'react-stars';
import Title from './Title';
import Geolocator from './Geolocator';
import SearchBar from './SearchBar';
import AllBusinesses from './AllBusinesses';
import ShowBusinesses from './ShowBusinesses';
import ShowTerm from './ShowTerm';
import ShowAllLink from './ShowAllLink';
// the {} are required around Memes because it's exported without default
import { Memes } from './Memes';

class HiddenForm extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			lat: 0,
			lng: 0,
			businesses: [],
			term: "food",
			count: 0,
			submitted: true,
			showAll: false
		};

		this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.showAll = this.showAll.bind(this);
	}

	setLocation(lat, lng){
		this.setState({
			lat: lat,
			lng: lng
		})
	}

	showAll(){
		this.setState({showAll: true})
		window.scrollTo(0, 0)
	}

	onChange(event) {
		this.setState({	[event.target.name]: event.target.value });
	}

	onClick(){
		this.setState({submitted: false})
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
										count: this.state.count += 1,
										showAll: false
									}))
			.catch(error => console.log(error.message));
	}

	render(){
		return(
			<div className="container mb-100">
				<Title onClick={()=>this.setState({businesses: [], count: 0})} />
				<form onSubmit={this.onSubmit}>
					<Geolocator setLocation={this.setLocation} />
					<input type="hidden" value={this.state.lat} name="lat"/>
					<input type="hidden" value={this.state.lng} name="lng"/>			
					<div className="row mt-2">
						<div className="col-md-6 offset-md-3">
							{ this.state.submitted ? <ShowBusinesses businesses={this.state.businesses} showAll={this.state.showAll} /> : <ShowTerm term={this.state.term} />}
							<div className="mt-3">
							  {this.state.count > 2 ? <SearchBar onChange={this.onChange} onClick={this.onClick} /> : null}
							</div>
						</div>
					</div>	
						<button type="submit" className="red-button mt-5"></button>
				</form>
				{ this.state.submitted && this.state.count > 0 && !(this.state.showAll) ? <ShowAllLink onClick={this.showAll} /> : null }
				{ this.state.submitted && this.state.count == 0 ? <Memes /> : null }
			</div>
		);
	}
}

export default HiddenForm;
