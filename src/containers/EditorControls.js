import React, { Component } from "react";
import InlineStyleControls from "../components/InlineStyleControls";
import BlockStyleControls from "../components/BlockStyleControls";

export class EditorControls extends Component {
	render() {
		return (
			<div className="RichEditor-controls-container">
				< BlockStyleControls
					editorState={this.props.editorState}
					onToggle={this.props.onToggleBlockType}
				/>
				< InlineStyleControls
					editorState={this.props.editorState}
					onToggle={this.props.onToggleInlineStyle}
				/>
			</div>
		);
	}
}

export default EditorControls;
