

import Draft from 'draft-js';
import Prism from 'prismjs'
import React from 'react';
import Immutable from 'immutable';
import PrismDecorator from 'draft-js-prism';
import "./rich.css";
import "./prism.css";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import PrismCode from "./PrismCode"

const code = `
const foo = 'foo';
const bar = 'bar';
console.log(foo + bar);
`;

const {
	Editor,
	EditorState,
	RichUtils,
	DefaultDraftBlockRenderMap,
	Decorator,
	convertFromRaw
} = Draft;

const {Map, List} = Immutable;

export default class PrismEditorExample extends React.Component {
	 constructor(props) {
		  super(props);

		  var decorator = new PrismDecorator();
		  var contentState = convertFromRaw({
				entityMap: {},
				blocks: [
					 {
							type: 'header-one',
							text: 'Demo for draft-js-prism'
					 },
					 {
							type: 'unstyled',
							text: 'press any bit of text to edit'
					 },
					 {
							type: 'code-block',
							text: 'var message = "This is awesome!";'
					 }
				]
		  })

		  this.state = {
				editorState: EditorState.createWithContent(contentState, decorator),
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
	
	customBlockRenderer(contentBlock) {
		const type = contentBlock.getType();
		const text = contentBlock.getText();
		if (type === 'atomic') {

			return { 
				component: PrismCode,
				editable: true,
				props: {
					code: text,
					language: 'js',
					plugins: ["line-numbers"]
				},
			};
		}
	}

	 render() {
		const {editorState} = this.state;

		// If the user changes block type before entering any text, we can
		// either style the placeholder or hide it. Let's just hide it now.
		let className = 'RichEditor-editor';
		var contentState = editorState.getCurrentContent();
		if (!contentState.hasText()) {
			if (contentState.getBlockMap().first().getType() !== 'unstyled') {
				className += ' RichEditor-hidePlaceholder';
			}
		}

		return (
			<Container><Row className="justify-content-md-center">< Col md='7'>
				<div className="RichEditor-root">
					<BlockStyleControls
						editorState={editorState}
						onToggle={this.toggleBlockType}
					/>
					<InlineStyleControls
						editorState={editorState}
						onToggle={this.toggleInlineStyle}
					/>
					<div className={className} onClick={this.focus}>
						<Editor
							blockStyleFn={getBlockStyle}
							customStyleMap={styleMap}
							blockRendererFn={this.customBlockRenderer}
							editorState={editorState}
							handleKeyCommand={this.handleKeyCommand}
							onChange={this.onChange}
							placeholder="Tell a story..."
							ref="editor"
							spellCheck={true}
						/>
					</div>
					{/* <PrismCode
						code={code}
						language="js"
						plugins={["line-numbers"]}
					/> */}
				</div>
			</Col></Row></Container>
		);
	}
}

class JavaScriptBlock extends React.Component {
	render() {
		const {block, contentState} = this.props;
		// const {foo} = this.props.blockProps;
		const data = contentState.getEntity(block.getEntityAt(0)).getData();
		// Return a <figure> or some other content using this data.

		console.log(data)
		return null
	}
}

// Custom overrides for "code" style.
const styleMap = {
	 CODE: {
		  backgroundColor: 'rgba(0, 0, 0, 0.05)',
		  fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
		  fontSize: 16,
		  padding: 2,
	 },
};

function getBlockStyle(block) {
	 switch (block.getType()) {
		  case 'blockquote': return 'RichEditor-blockquote';
		  default: return null;
	 }
}

class StyleButton extends React.Component {
	 constructor() {
		  super();
		  this.onToggle = (e) => {
				e.preventDefault();
				this.props.onToggle(this.props.style);
		  };
	 }

	 render() {
		  let className = 'RichEditor-styleButton';
		  if (this.props.active) {
				className += ' RichEditor-activeButton';
		  }

		  return (
				<span className={className} onMouseDown={this.onToggle}>
					 {this.props.label}
				</span>
		  );
	 }
}

const BLOCK_TYPES = [
	{label: 'H1', style: 'header-one'},
	{label: 'H2', style: 'header-two'},
	{label: 'H3', style: 'header-three'},
	{label: 'H4', style: 'header-four'},
	{label: 'H5', style: 'header-five'},
	{label: 'H6', style: 'header-six'},
	{label: 'Blockquote', style: 'blockquote'},
	{label: 'UL', style: 'unordered-list-item'},
	{label: 'OL', style: 'ordered-list-item'},
	{label: 'Code Block', style: 'code-block'},
	{label: 'JavaScript', style: 'atomic'},
];

const BlockStyleControls = (props) => {
	 const {editorState} = props;
	 const selection = editorState.getSelection();
	 const blockType = editorState
		  .getCurrentContent()
		  .getBlockForKey(selection.getStartKey())
		  .getType();

	 return (
		  <div className="RichEditor-controls">
				{BLOCK_TYPES.map((type) =>
					 <StyleButton
						  key={type.label}
						  active={type.style === blockType}
						  label={type.label}
						  onToggle={props.onToggle}
						  style={type.style}
					 />
				)}
		  </div>
	 );
};

var INLINE_STYLES = [
	 {label: 'Bold', style: 'BOLD'},
	 {label: 'Italic', style: 'ITALIC'},
	 {label: 'Underline', style: 'UNDERLINE'},
	 {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
	 var currentStyle = props.editorState.getCurrentInlineStyle();
	 return (
		  <div className="RichEditor-controls">
				{INLINE_STYLES.map(type =>
					 <StyleButton
						  key={type.label}
						  active={currentStyle.has(type.style)}
						  label={type.label}
						  onToggle={props.onToggle}
						  style={type.style}
					 />
				)}
		  </div>
	 );
};

// import React from "react";
// import Draft from "draft-js";
// import Prism from "prismjs";
// import "./rich.css";
// import "./prism.css";
// import Container from 'react-bootstrap/Container';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import createEmojiPlugin from 'draft-js-emoji-plugin';
// import createPrismPlugin from 'draft-js-prism-plugin';


// import PrismDecorator from 'draft-js-prism';

// const decorator = PrismDecorator({
//	prism: Prism,
// });

// const emojiPlugin = createEmojiPlugin();
// const prismPlugin = createPrismPlugin({prism: Prism});

// const { EmojiSuggestions} = emojiPlugin;

// const { Editor, EditorState, RichUtils, getDefaultKeyBinding } = Draft;




// export default class RichEditorExample extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { editorState: EditorState.createEmpty(decorator) };
// 		this.focus = () => this.refs.editor.focus();
// 		this.onChange = editorState => this.setState({ editorState });
// 		this.handleKeyCommand = this._handleKeyCommand.bind(this);
// 		this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
// 		this.toggleBlockType = this._toggleBlockType.bind(this);
// 		this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
// 	}
// 	_handleKeyCommand(command, editorState) {
// 		const newState = RichUtils.handleKeyCommand(editorState, command);
// 		if (newState) {
// 			this.onChange(newState);
// 			return true;
// 		}
// 		return false;
// 	}
// 	_mapKeyToEditorCommand(e) {
// 		if (e.keyCode === 9 /* TAB */) {
// 			const newEditorState = RichUtils.onTab(
// 				e,
// 				this.state.editorState,
// 				4 /* maxDepth */
// 			);
// 			if (newEditorState !== this.state.editorState) {
// 				this.onChange(newEditorState);
// 			}
// 			return;
// 		}
// 		return getDefaultKeyBinding(e);
// 	}
// 	_toggleBlockType(blockType) {
// 		this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
// 	}
// 	_toggleInlineStyle(inlineStyle) {
// 		this.onChange(
// 			RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
// 		);
// 	}

	

// 	componentDidMount() {
// 		Prism.highlightAll();
// 	}

// 	render() {
// 		const { editorState } = this.state;
// 		// If the user changes block type before entering any text, we can
// 		// either style the placeholder or hide it. Let's just hide it now.
// 		let className = "RichEditor-editor";
// 		var contentState = editorState.getCurrentContent();
// 		if (!contentState.hasText()) {
// 			if (
// 				contentState
// 					.getBlockMap()
// 					.first()
// 					.getType() !== "unstyled"
// 			) {
// 				className += " RichEditor-hidePlaceholder";
// 			}
// 		}
// 		return (
// 			<div className="RichEditor-root post-editor">
// 				<Container>
// 					<Row className="justify-content-md-center">
// 						<Col md="7">
// 							<BlockStyleControls
// 								editorState={editorState}
// 								onToggle={this.toggleBlockType}
// 							/>
// 							<InlineStyleControls
// 								editorState={editorState}
// 								onToggle={this.toggleInlineStyle}
// 							/>
// 							<div className={className} onClick={this.focus}>
// 								<Editor
// 									blockStyleFn={getBlockStyle}
// 									customStyleMap={styleMap}
// 									editorState={editorState}
// 									handleKeyCommand={this.handleKeyCommand}
// 									keyBindingFn={this.mapKeyToEditorCommand}
// 									onChange={this.onChange}
// 									ref="editor"
// 									spellCheck={true}
// 									plugins={[prismPlugin]}
// 								/>
// 								<EmojiSuggestions />
// 							</div>
// <pre>
// 	<code className='language-javascript'>
// 		{`
// onSubmit(e) {
// 	e.preventDefault();
// 	const job = {
// 		title: 'Developer',
// 		company: 'Facebook' 
// 	};
// };
// 		`}
// 	</code>
// </pre>
// 						</Col>
// 					</Row>
// 				</Container>
// 			</div>
// 		);
// 	}
// }
// // Custom overrides for "code" style.
// const styleMap = {
// 	CODE: {
// 		backgroundColor: "rgba(0, 0, 0, 0.05)",
// 		fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
// 		fontSize: 16,
// 		padding: 2
// 	}
// };
// function getBlockStyle(block) {
// 	switch (block.getType()) {
// 		case "blockquote":
// 			return "RichEditor-blockquote";
// 		default:
// 			return null;
// 	}
// }
// class StyleButton extends React.Component {
// 	constructor() {
// 		super();
// 		this.onToggle = e => {
// 			e.preventDefault();
// 			this.props.onToggle(this.props.style);
// 		};
// 	}
// 	render() {
// 		let className = "RichEditor-styleButton";
// 		if (this.props.active) {
// 			className += " RichEditor-activeButton";
// 		}
// 		return (
// 			<span className={className} onMouseDown={this.onToggle}>
// 				{this.props.label}
// 			</span>
// 		);
// 	}
// }
// const BLOCK_TYPES = [
// 	{ label: "H1", style: "header-one" },
// 	{ label: "H2", style: "header-two" },
// 	{ label: "H3", style: "header-three" },
// 	{ label: "H4", style: "header-four" },
// 	{ label: "H5", style: "header-five" },
// 	{ label: "H6", style: "header-six" },
// 	{ label: "Blockquote", style: "blockquote" },
// 	{ label: "UL", style: "unordered-list-item" },
// 	{ label: "OL", style: "ordered-list-item" },
// 	{ label: "Code Block", style: "code-block"}
// ];
// const BlockStyleControls = props => {
// 	const { editorState } = props;
// 	const selection = editorState.getSelection();
// 	const blockType = editorState
// 		.getCurrentContent()
// 		.getBlockForKey(selection.getStartKey())
// 		.getType();
// 	return (
// 		<div className="RichEditor-controls">
// 			{BLOCK_TYPES.map(type => (
// 				<StyleButton
// 					key={type.label}
// 					active={type.style === blockType}
// 					label={type.label}
// 					onToggle={props.onToggle}
// 					style={type.style}
// 				/>
// 			))}
// 		</div>
// 	);
// };
// var INLINE_STYLES = [
// 	{ label: "Bold", style: "BOLD" },
// 	{ label: "Italic", style: "ITALIC" },
// 	{ label: "Underline", style: "UNDERLINE" },
// 	{ label: "Monospace", style: "CODE" }
// ];
// const InlineStyleControls = props => {
// 	const currentStyle = props.editorState.getCurrentInlineStyle();

// 	return (
// 		<div className="RichEditor-controls">
// 			{INLINE_STYLES.map(type => (
// 				<StyleButton
// 					key={type.label}
// 					active={currentStyle.has(type.style)}
// 					label={type.label}
// 					onToggle={props.onToggle}
// 					style={type.style}
// 				/>
// 			))}
// 		</div>
// 	);
// };
