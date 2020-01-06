import React, {Component} from "react"
import Prism from "prismjs"

export default class PrismCode extends Component {

	constructor(props) {
		super(props)
		this.ref = React.createRef()
	}
	componentDidMount() {
		this.highlight()
	}
	componentDidUpdate() {
		this.highlight()
	}
	highlight = () => {
		if (this.ref && this.ref.current) {
			Prism.highlightElement(this.ref.current)
		}
	}
	render() {
		const { code, plugins, language } = this.props.blockProps
		return (
			<pre className={!plugins ? "" : plugins.join(" ")}>
				<code ref={this.ref} className={`language-${language}`}>
					{code}
				</code>
			</pre>
		)
	}
}