import React, { Component } from 'react';
import Prism from "prismjs"
import Style from 'style-it';
import loadSupportedLanguages from "./loadPrismComponents"
loadSupportedLanguages();
export default class CodeBlock extends Component {
	
	copyBlock = () => {
		
		const data = this.props.data.join("\n")
		navigator.clipboard.writeText(data)
		debugger
	}

	renderCodeLines = () => {

		// loadLanguages([this.props.language])
		// importLanguage(this.props.language)
		const supportedLanguages = ["javascript", "python", "ruby", "html", "jsx", "css", "java"]
		const data = this.props.data
		const language = supportedLanguages.includes(this.props.language) ? this.props.language : "javascript"
		return data.map((line, index) => {
			return (
				<code
					className="code-block-line"
					key={randKey()}
					dangerouslySetInnerHTML={
						{__html: Prism.highlight(
							line + (index === data.length - 1 ? "" : "\n"),
							Prism.languages[language],
							language
							)
						}
					}
				>
				</code>
			)
		})

	}

	render() {
		return Style.it(
			`
			.code-block-container:before {
				content: "${this.props.language.toUpperCase()}"
			}
			`,
			<div className={`code-block-container`}>
				<button className="copy-code-block" onClick={this.copyBlock}>COPY</button>
				<pre className="code-block">
					{this.renderCodeLines()}
					<br/>
				</pre>
			</div>
		);
	};

};

const randKey = () => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	let charactersLength = characters.length;
	for ( var i = 0; i < 10; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}