import React, { Component, Fragment } from 'react';
import Prism from "prismjs"
import { convertToRaw, convertFromRaw } from "draft-js"
import { convertFromHTML, convertToHTML } from "draft-convert"
import {stateToHTML} from 'draft-js-export-html';
import "../styles/post.css"



import { DraftailEditor, ENTITY_TYPE, BLOCK_TYPE } from "draftail"

const exporterConfig = {
	blockToHTML: (block) => {
		if (block.type === BLOCK_TYPE.BLOCKQUOTE) {
			return <blockquote />
		}
		if (block.type === BLOCK_TYPE.CODE) {
			return <code />
		}

		// Discard atomic blocks, as they get converted based on their entity.
		if (block.type === BLOCK_TYPE.ATOMIC) {
			return {
				start: "",
				end: "",
			}
		}

		return null
	},

	entityToHTML: (entity, originalText) => {
		if (entity.type === ENTITY_TYPE.LINK) {
			return <a href={entity.data.url}>{originalText}</a>
		}

		if (entity.type === ENTITY_TYPE.IMAGE) {
			return <img src={entity.data.src} alt={entity.data.alt} />
		}

		if (entity.type === ENTITY_TYPE.HORIZONTAL_RULE) {
			return <hr />
		}

		return originalText
	},
}









export class SmallPost extends Component {

	buildPost = (postData) => {
		const data = JSON.parse(postData.content)
		const parseInlineStyling = (data) => {
			// debugger
			const blocksWithInlineStyling = data.blocks.map((block, index) => {
				// debugger
				if (block.inlineStyleRanges.length > 0) {
					let letterArray = block.text.split("").map((element, index) => {
						return {character: element, style: []}
					});
					block.inlineStyleRanges.forEach(range => {
						letterArray.forEach((el, i) => {
							if ( i >= range.offset && i <= range["offset"] + range["length"]) {
								el.style.push(range.style)
							}
						})
					})
					let outputArray = []
					letterArray.forEach((obj, index) => {
						let currArrStyles = obj.style.sort().join(" ")
						if (index === 0) {
							outputArray.push(`<span class="${currArrStyles}">`)
							outputArray.push(obj.character)
						} else {
							let prevArrStyles = letterArray[index - 1].style.sort().join(" ")
							if (currArrStyles !== prevArrStyles) {
								outputArray.push(`</span>`)
								outputArray.push(`<span class="${currArrStyles}">`)
							}
							outputArray.push(obj.character)
						}
					})
					outputArray.push(`</span>`)
					// return 
					block.styledHTML = outputArray.join("");
					return {styledHTML: outputArray.join(""), type: block.type, text: block.text}
				} else {
					return {styledHTML: `<span>${block.text}</span>`, type: block.type, text: block.text}
				}
			})
			return {blocks: blocksWithInlineStyling, entityMap: data.entityMap}
			// debugger;
		}
		// debugger;
		const parseBlockStyling = (data) => {
			// debugger;
			let codeBlock = []
			const blocks = data.blocks.map((element, index) => {
				// debugger
				switch (element.type) {
					case "header-two":
						return (
							<h2
								className="Draftail-block--header-two"
								key={index}
								dangerouslySetInnerHTML={
									{__html: element.styledHTML}
								}
							></h2>)
					case "header-three":
						return(
							<h3
								className="Draftail-block--header-three"
								key={index}
								dangerouslySetInnerHTML={
									{__html: element.styledHTML}
								}
							></h3>)
					case "code-block":
						if (index < data.blocks.length-1 && data.blocks[index + 1].type === "code-block") {
							codeBlock.push(element.text)
						} else if (index = data.blocks.length-1) {
							codeBlock.push(element.text)
							return(
								<pre className="code-block-container" key={index}>
									<code
										className="code-block-line"
										dangerouslySetInnerHTML={
											{__html: Prism.highlight(
												codeBlock.join("\n"),
												Prism.languages.javascript,
												"javascript"
												)
											}
										}
									>
									</code>
									<br/>
								</pre>
							)
						} else {
							return(
								<pre className="code-block-container" key={index}>
									<code
										className="code-block-line"
										dangerouslySetInnerHTML={
											{__html: Prism.highlight(
												codeBlock.join("\n"),
												Prism.languages.javascript,
												"javascript"
												)
											}
										}
									>
									</code>
									<br/>
								</pre>
							)

						}
					default:
						return (
							<p
								className="Draftail-block--unstyled"
								key={index}
								dangerouslySetInnerHTML={
									{__html: element.styledHTML}
								}
							></p>)
				}
			});
			// debugger
			return blocks;
		}
		
		const dataWithInlineStyling = parseInlineStyling(data)
		const dataToDisplay = parseBlockStyling(dataWithInlineStyling)
		// debugger;
		// return(<div dangerouslySetInnerHTML={{__html: dataToDisplay}}></div>)
		return(dataToDisplay)
		// debugger;
		// const secondaryParsedData = parseBlockStyling(initialParsedData)
		// return secondaryParsedData;
		// const oof = (convertFromRaw(data))
		// const owie = stateToHTML(oof)
		// debugger;
		console.log(data)
	
	}
	render() {
		return (
			<div className="individual-post">
				{this.buildPost(this.props.postData)}
			</div>
		);
	}
}

export default SmallPost;
