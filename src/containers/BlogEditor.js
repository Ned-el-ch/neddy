import React, { Component, div } from 'react';
// import Draft from "draft-js";
// import Prism from "prismjs";
// import Immutable from "immutable";
// import EditorControls from "./EditorControls";
import PrismDecorator from '../components/PrismDecorator'
import createHashtagPlugin from "draft-js-hashtag-plugin"

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE, ENTITY_TYPE } from "draftail"

import "draft-js/dist/Draft.css"
import "draftail/dist/draftail.css"
import "../styles/rich.css";
import "../styles/prism.css";

const hashtagPlugin = createHashtagPlugin();
const initial = JSON.parse(sessionStorage.getItem("draftail:content"))

export default class BlogEditor extends Component {

	onSave = (content) => {
		console.log("saving", content)
		sessionStorage.setItem("draftail:content", JSON.stringify(content))
	}

	submitPost = () => {

		const userId = this.props.userId
		fetch("http://localhost:4000/submit_post", {
			method: "POST",
			headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
			},
			body: JSON.stringify({
					post : {
							content: sessionStorage["draftail:content"],
							categories: [1],
							user_id: userId
					}
			})
		})
		.then(res => res.json())
		.then(console.log)

	}

	render() {

		return (
			<Container><Row className="justify-content-md-center">
			<Col md={{ span: 9, offset: 0}}>
				<DraftailEditor
					ref="draftRef"
					rawContentState={initial || null}
					// rawContentState={initial || null}
					onSave={this.onSave}
					blockTypes={blockTypes}
					inlineStyles={inlineStyles}
					entityTypes={[{type: ENTITY_TYPE.LINK}]}
					plugins={[hashtagPlugin]}
					decorators={[new PrismDecorator({ defaultLanguage: "javascript" })]}
				/>
				<button onClick={this.submitPost}>Submit Post</button>
			</Col></Row></Container>

		);

	};

};


const blockTypes = [
	{ type: BLOCK_TYPE.HEADER_TWO },
	{ type: BLOCK_TYPE.HEADER_THREE },
	{ type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
	{ type: BLOCK_TYPE.ORDERED_LIST_ITEM },
	{ type: BLOCK_TYPE.CODE },
]

const inlineStyles = [
	{ type: INLINE_STYLE.BOLD },
	{ type: INLINE_STYLE.ITALIC },
	{ type: INLINE_STYLE.CODE },
	{ type: INLINE_STYLE.UNDERLINE },
	{ type: INLINE_STYLE.STRIKETHROUGH },
]