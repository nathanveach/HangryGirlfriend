import React from 'react';

const SearchBar = (props) => {
	return (
		<div className="form-group">
			<label className="font-weight-bold">Is she really being PICKY and HANGRY?? Try a search term:</label>
			<input 
				type="text"
				className="form-control"
				name="term"
				placeholder="Sushi.. Pizza.. Mexican.. Goodluck bro!!"
				onChange={props.onChange}
				onClick={props.onClick}
				/>
		</div>
	)
}

export default SearchBar;
