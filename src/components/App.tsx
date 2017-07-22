import * as React from 'react';
import Ribbon from './Ribbon';
import LoremIpsumButtons from './LoremIpsumButtons';

const App = () => (
	<div className="App">
		<Ribbon />
		<h1>Lorem ipsum</h1>
		<LoremIpsumButtons max={5} units="words" />
		<LoremIpsumButtons max={5} units="sentences" />
		<LoremIpsumButtons max={5} units="paragraphs" />
	</div>
);

export default App;
