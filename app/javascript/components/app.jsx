import React from 'react';
// the {} are required around Memes because it's exported without default
import { Memes } from './Memes';
// Title doesn't need {} because it's exported with default
import Title from './Title';
import HiddenForm from './HiddenForm'


const App = () => {
	return (
		<div className="container">
			<Title />
			<HiddenForm />
			<Memes />
		</div>
	);
}

export default App;
