import React, { Component } from 'react';
import RichEditor from './RichEditor';
import './App.css';
import PrismEditorExample from './PrismEditorExample';

export default class App extends Component {

	render() {

		return (
	
			<div className='app'>

				{/* < RichEditor /> */}
				< PrismEditorExample />
	
			</div>
	
		);

	};

};