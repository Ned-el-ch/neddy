import React, { Component } from 'react';
import Prism from "prismjs"
export default class CodeBlock extends Component {

	render() {
		return (
			<pre className="code-block-container" key={this.props.index}>
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
		);
	};

};