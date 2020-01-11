import React, { Component } from 'react';
import Prism from "prismjs"
export default class CodeBlock extends Component {

	copyBlock = () => {

		const data = this.props.data.join("\n")
		navigator.clipboard.writeText(data)

	}

	render() {
		return (
			<div className="code-block-container">
				<button className="copy-code-block" onClick={this.copyBlock}>COPY</button>
				<pre className="code-block">
					<code
						className="code-block-line"
						dangerouslySetInnerHTML={
							{__html: Prism.highlight(
								this.props.data.join("\n"),
								Prism.languages.javascript,
								"javascript"
								)
							}
						}
					>
					</code>
					<br/>
				</pre>
			</div>
		);
	};

};