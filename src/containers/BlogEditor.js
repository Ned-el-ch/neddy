import React, { Component, Fragment } from 'react';
import PrismDecorator from '../components/PrismDecorator'
import initialContent from "./initial.json"
import Select from 'react-select';
import Form from "react-bootstrap/Form"

import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE, ENTITY_TYPE } from "draftail"

import "draft-js/dist/Draft.css"
import "draftail/dist/draftail.css"
import "../styles/rich.css";
import "../styles/prism.css";
import "../styles/index.css";

// import createHashtagPlugin from "draft-js-hashtag-plugin"
// const hashtagPlugin = createHashtagPlugin();

// const initial = JSON.parse(sessionStorage.getItem("draftail:content"))
// const initial = initialContent
export default class BlogEditor extends Component {

	state = {
		readyToBeSubmitted: false,
		categories: [],
		title: ""
	}

	onSave = (content) => {
		console.log("saving:", content)
		sessionStorage.setItem("draftail:content", JSON.stringify(content))
	}

	submitPost = () => {
		const history = this.props.history;
		const userId = this.props.userId
		fetch("https://agile-journey-79048.herokuapp.com/submit_post", {
			method: "POST",
			headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${localStorage["token"]}`
			},
			body: JSON.stringify({
					post : {
							content: sessionStorage["draftail:content"],
							categories: this.state.categories,
							user_id: userId,
							title:  this.state.title
					}
			})
		})
		.then(res => res.json())
		.then(res => history.push(`/posts/${res.id}`))
		.catch(console.log)
	}

	checkIfReadyForSubmission = (opt, meta) => {
		if (opt && opt.length >= 3 && opt.length <= 5 ) {
			const categories = opt.map(category => {
				return category.value
			})
			if (this.state.title.length >= 20) {
				this.setState({categories, readyToBeSubmitted: true})
			} else {
				this.setState({categories, readyToBeSubmitted: false})
			}
		} else {
			this.setState({categories: [], readyToBeSubmitted: false})
		}
	}

	setTitle = (event) => {
		event.preventDefault()
		// debugger;
		const title = event.target.value;
		const categories = this.state.categories;

		if (categories.length >= 3 && categories.length <= 5) {
			this.setState({title: title, readyToBeSubmitted: title.length >= 20})
		} else {
			this.setState({title: title, readyToBeSubmitted: false})
		}
	}

	render() {
		return (
			<Fragment>
				<Form >
					<Form.Group controlId="postTitle">
						{/* <Form.Label>Email address</Form.Label> */}
						<Form.Control onChange={this.setTitle} type="title" placeholder="Post title goes here..." />
						<Form.Text className="text-muted">
							Minimum 20 characters
						</Form.Text>
					</Form.Group>
				</Form>
				<DraftailEditor
					ref="draftRef"
					rawContentState={null}
					// rawContentState={initialContent || null}
					// rawContentState={initial || null}
					onSave={this.onSave}
					blockTypes={blockTypes}
					inlineStyles={inlineStyles}
					placeholder="Write something here, make sure to use the block and inline stylings above"
					// entityTypes={entityTypes}
					// plugins={[hashtagPlugin]}
					decorators={[new PrismDecorator({ defaultLanguage: "javascript" })]}
				/>
				<Select
					isMulti
					options={this.props.categories}
					className="categories-search"
					onChange={(opt, meta) => this.checkIfReadyForSubmission(opt, meta)}
					placeholder="Select between 3 and 5 categories..."
					// closeOnSelect={this.state.readyToBeSubmitted}
					closeMenuOnSelect={this.state.categories.length <=3 ? false : true}
					pageSize={5}
					noResultsText="That category is in another castle"

				/>
				<button onClick={this.submitPost} disabled={!this.state.readyToBeSubmitted} className="submit-post">Submit Post</button>
			</Fragment>
		);
	};
};

const blockTypes = [
	// { type: BLOCK_TYPE.HEADER_ONE, label: "Heading", description: null },
	{ type: BLOCK_TYPE.HEADER_FOUR, label: "Sub-heading" , description: null },
	{ type: BLOCK_TYPE.BLOCKQUOTE, label: "Block Quote" , description: null },
	{ type: BLOCK_TYPE.UNORDERED_LIST_ITEM, label: "Bullet List" , description: null },
	{ type: BLOCK_TYPE.ORDERED_LIST_ITEM, label: "Number List" , description: null },
	{ type: BLOCK_TYPE.CODE, label: "Code Block" , description: "put the language as the first line of the code block\njavascript  |  jsx  |  css  |  html  |  ruby  |  python  |  java"},
	{ type: "millenial-quote", label: "👏",description: "oof"},
]

const inlineStyles = [
	{ type: INLINE_STYLE.BOLD, label: "B" },
	{ type: INLINE_STYLE.ITALIC },
	// { type: INLINE_STYLE.CODE },
	{ type: INLINE_STYLE.UNDERLINE },
	{ type: INLINE_STYLE.STRIKETHROUGH },
	{ type: INLINE_STYLE.MARK, label: "Highlight" },
	{ type: INLINE_STYLE.QUOTATION , label: "“ ”", style: {fontStyle: "italic", fontWeight: "340"}},
	{ type: INLINE_STYLE.SMALL, label: "SMALL", style: {fontSize: "0.5rem", textTransform: "uppercase"}},
	{ type: INLINE_STYLE.SAMPLE, label: "code", style: {	padding: "0.2em 0.3125em",
		margin: "0px",
		fontSize: "90%",
		fontWeight: "550",
		color: "white",
		backgroundColor: "#3c3c57",
		fontFamily: "Consolas, Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace, sans-serif",
		borderRadius: "4px",
		borderTop: "solid 4px #71659b",}, description: "Inline code"},
	// { type: INLINE_STYLE.INSERT },
	{ type: "REDACTED" , label: "Redacted", style: {backgroundColor: "black", color:"black"}},
	{ type: INLINE_STYLE.KEYBOARD },
	{ type: INLINE_STYLE.SUPERSCRIPT,label: "Superscript", style: 
		{
			fontSize: "60%",
			verticalAlign: "super",
			lineHeight: "1"} },
	{ type: INLINE_STYLE.SUBSCRIPT, label: "Subscript", style: 
		{
			fontSize: "60%",
			verticalAlign: "sub",
			lineHeight: "1"} },
]

const entityTypes = [
	{type: ENTITY_TYPE.LINK},
	{type: ENTITY_TYPE.IMAGE},
	{type: ENTITY_TYPE.HORIZONTAL_RULE},
]

const decorators = [
	{
		strategy: (block, callback) => {
		  const text = block.getText();
		  let matches;
		  while ((matches = /#[\w]+/g.exec(text)) !== null) {
			 callback(matches.index, matches.index + matches[0].length);
		  }
		},
		component: ({ children }) => (
		  <span style={{ color: "#007d7e" }}>{children}</span>
		),
	 },
]