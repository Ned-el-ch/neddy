import React, {Component} from "react";
import Draft from "draft-js";
import Prism from "prismjs";
import Immutable from "immutable";
import EditorControls from "./EditorControls";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "../styles/rich.css";
import "../styles/prism.css"

const {
	Editor,
	EditorState,
	RichUtils,
	// DefaultDraftBlockRenderMap,
	// Decorator
 } = Draft;
 const {
	//  Map,
	 List
} = Immutable;
class PrismDecorator {
	constructor(grammar) {
		this.grammar = grammar;
		this.highlighted = {};
	}
	getDecorations(block) {
		var blockType = block.getType();
		var blockKey = block.getKey();
		var blockText = block.getText();
		var decorations = Array(blockText.length).fill(null);
		this.highlighted[blockKey] = {};
		if (blockType !== "code-block") {
		 return List(decorations);
		}
		var tokens = Prism.tokenize(blockText, this.grammar);
		var offset = 0;
		var that = this;
		tokens.forEach(function(tok) {
		 if (typeof tok === "string") {
			offset += tok.length;
		 } else {
			var tokId = "tok"+offset;
			var completeId = blockKey + "-" + tokId;
			that.highlighted[blockKey][tokId] = tok;
			occupySlice(decorations, offset, offset + tok.content.length, completeId);
			offset += tok.content.length;
		 }
		});
		return List(decorations);
	}
	getComponentForKey(key) {
		return function(props) {
		 return <span {...props} className={"token " + props.tokType}>{props.children}</span>;
		}
	}
	getPropsForKey(key) {
		var parts = key.split("-");
		var blockKey = parts[0];
		var tokId = parts[1];
		var token = this.highlighted[blockKey][tokId];
		return {
		 tokType: token.type
		};
	}
 }
 function occupySlice(targetArr, start, end, componentKey) {
	for (var ii = start; ii < end; ii++) {
		targetArr[ii] = componentKey;
	}
 }
 export default class PrismEditor extends Component {
	constructor(props) {
		super(props);
		const decorator = new PrismDecorator(Prism.languages.javascript);
		this.state = {
		 editorState: EditorState.createEmpty(decorator),
		};
		this.focus = () => this.refs.editor.focus();
		this.onChange = (editorState) => this.setState({editorState});
		this.handleKeyCommand = (command) => this._handleKeyCommand(command);
		this.toggleBlockType = (type) => this._toggleBlockType(type);
		this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
	}
	_handleKeyCommand(command) {
		const {editorState} = this.state;
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
		 this.onChange(newState);
		 return true;
		}
		return false;
	}
	_toggleBlockType(blockType) {
		this.onChange(
			RichUtils.toggleBlockType(
				this.state.editorState,
				blockType
			)
		);
	}
	_toggleInlineStyle(inlineStyle) {
		this.onChange(
			RichUtils.toggleInlineStyle(
				this.state.editorState,
				inlineStyle
			)
		);
	}

	getBlockStyle(block) {
		switch (block.getType()) {
			case "blockquote": return "RichEditor-blockquote";
			case "new-age-shit": return "RichEditor-new-age-shit";
			default: return null;
		}
	}

	render() {
		const {editorState} = this.state;
		// If the user changes block type before entering any text, we can
		// either style the placeholder or hide it. Let"s just hide it now.
		let className = "RichEditor-editor";
		const contentState = editorState.getCurrentContent();
		if (!contentState.hasText()) {
			if (contentState.getBlockMap().first().getType() !== "unstyled") {
				className += " RichEditor-hidePlaceholder";
			}
		}
		return (
			<Container>
				<Row className="justify-content-md-center">
			{/* <Container><Row className="justify-content-md-center"> */}

				<Col md={{ span: 9, offset: 0}}>
				<div className="RichEditor-root">
					<div className={className} onClick={this.focus}>
						<Editor
						blockStyleFn={this.getBlockStyle}
						editorState={editorState}
						handleKeyCommand={this.handleKeyCommand}
						onChange={this.onChange}
						// placeholder="Tell a story..."
						ref="editor"
						spellCheck={true}
						/>
					</div>
				</div>
				</Col>
				</ Row>
				< Row >
				< Col md={{ span: 2, offset: 11}}>
				{/* < Col md={{ span: 2, offset: 11}}> */}
					< EditorControls 
					className="position-absolute sticky-top"
						editorState={editorState}
						onToggleBlockType={this.toggleBlockType}
						onToggleInlineStyle={this.toggleInlineStyle}
					/>
				</Col>
			</Row>
			</Container>
		);
	}
}