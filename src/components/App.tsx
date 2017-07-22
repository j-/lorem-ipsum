import * as React from 'react';
import Ribbon from './Ribbon';
import LoremIpsumButtons from './LoremIpsumButtons';
import LoremIpsumGenerator from './LoremIpsumGenerator';

const App = () => (
	<div className="App">
		<Ribbon />
		<h1>Lorem ipsum</h1>
		<br />
		<LoremIpsumButtons max={5} units="words" />
		<LoremIpsumButtons max={5} units="sentences" />
		<LoremIpsumButtons max={5} units="paragraphs" />
		<br />
		<h2>Generate</h2>
		<br />
		<LoremIpsumGenerator />
	</div>
);

export default App;
