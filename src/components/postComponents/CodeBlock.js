import React, { Component } from 'react';
import Prism from "prismjs"
export default class CodeBlock extends Component {

	copyBlock = () => {

		const data = this.props.data.join("\n")
		navigator.clipboard.writeText(data)

	}

	renderCodeLines = () => {

		const data = this.props.data
		return data.map((line, index) => {
			return (
				<code
					className="code-block-line"
					dangerouslySetInnerHTML={
						{__html: Prism.highlight(
							line + (index === data.length - 1 ? "" : "\n"),
							Prism.languages.javascript,
							"javascript"
							)
						}
					}
				>
				</code>
			)
		})

	}

	render() {
		return (
			<div className="code-block-container">
				<button className="copy-code-block" onClick={this.copyBlock}>COPY</button>
				<pre className="code-block">
					{this.renderCodeLines()}
					<br/>
				</pre>
			</div>
		);
	};

};