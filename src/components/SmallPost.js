import React, { Component } from 'react';

import Heading2 from "./postComponents/Heading2";
import Heading3 from "./postComponents/Heading3";
import Quote from "./postComponents/Quote";
import MillenialQuote from "./postComponents/MillenialQuote";
import CodeBlock from "./postComponents/CodeBlock";
import OrderedList from "./postComponents/OrderedList";
import UnorderedList from "./postComponents/UnorderedList";

import "../styles/post.css"
import "../styles/rich.css"
import Unstyled from './postComponents/Unstyled';

/* ********* OLD ExportingConfig IGNORE FOR NOW, REMOVE LATER
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
*/

export default class SmallPost extends Component {

	buildPost = (postData) => {
		const data = JSON.parse(postData.content)
		const dataWithInlineStyling = parseInlineStyling(data)
		const dataToDisplay = parseBlockStyling(dataWithInlineStyling)
		return(dataToDisplay)
	}

	render() {
		return (
			<div className="individual-post">
				{this.buildPost(this.props.postData)}
			</div>
		);
	}
}

const parseInlineStyling = (data) => {
	const blocksWithInlineStyling = data.blocks.map((block, index) => {
		if (block.inlineStyleRanges.length > 0) {
			const letterArray = block.text.split("").map((element) => {
				return {character: element, style: []}
			});
			block.inlineStyleRanges.forEach(range => {
				letterArray.forEach((el, i) => {
					if ( i >= range.offset && i < range["offset"] + range["length"]) {
						el.style.push(range.style)
					}
				})
			});
			let outputArray = []
			letterArray.forEach((obj, index) => {
				const currArrStyles = obj.style.sort().join(" ")
				if (index === 0) {
					outputArray.push(`<span class="${currArrStyles}">`)
					outputArray.push(obj.character)
					return
				} else if (index < letterArray.length - 1) {
					const prevArrStyles = letterArray[index - 1].style.sort().join(" ")
					if (prevArrStyles !== currArrStyles) {
						outputArray.push(`</span>`)
						outputArray.push(`<span class="${currArrStyles}">`)
						outputArray.push(obj.character)
						return
					} else {
						outputArray.push(obj.character)
						return
					}
				} else {
					const prevArrStyles = letterArray[index - 1].style.sort().join(" ")
					if (prevArrStyles !== currArrStyles) {
						outputArray.push(`</span>`)
						outputArray.push(`<span class="${currArrStyles}">`)
						outputArray.push(obj.character)
						outputArray.push(`</span>`)
						return
					} else {
						outputArray.push(obj.character)
						outputArray.push(`</span>`)
						return
					}
				}
			})
			return {styledHTML: outputArray.join(""), type: block.type, text: block.text}
		} else {
			return {styledHTML: `<span>${block.text}</span>`, type: block.type, text: block.text}
		}
	})
	return {blocks: blocksWithInlineStyling, entityMap: data.entityMap}
}

const parseBlockStyling = (data) => {
	let codeBlock = []
	let olBlock = []
	let ulBlock = []
	const blocks = data.blocks.map((element, index) => {
		switch (element.type) {
			case "header-two": return (<Heading2 index={index} data={element.styledHTML}/>)
			case "header-three": return(<Heading3 index={index} data={element.styledHTML}/>)
			case "blockquote": return(<Quote index={index} data={element.styledHTML}/>)
			case "millenial-quote": return(<MillenialQuote index={index} data={element.styledHTML}/>)
			case "code-block":
				if (data.blocks.length === 1) {
					codeBlock.push(element.text)
					return(<CodeBlock key={index} data={codeBlock}/>)
				} else if (index === 0) {
					if (data.blocks[index + 1].type === "code-block") {
						codeBlock.push(element.text)
						return
					} else {
						codeBlock.push(element.text)
						return(<CodeBlock key={index} data={codeBlock}/>)
					}
				} else if (index < data.blocks.length - 1) {
					if (data.blocks[index - 1].type !== "code-block") {
						codeBlock = []
						if (data.blocks[index + 1].type === "code-block") {
							codeBlock.push(element.text)
							return
						} else {
							codeBlock.push(element.text)
							return(<CodeBlock key={index} data={codeBlock}/>)
						}
					} else {
						if (data.blocks[index + 1].type === "code-block") {
							codeBlock.push(element.text)
							return
						} else {
							codeBlock.push(element.text)
							return(<CodeBlock key={index} data={codeBlock}/>)
						}
					}
				} else {
					if (data.blocks[index - 1].type !== "code-block") {
						codeBlock = []
						codeBlock.push(element.text)
						return(<CodeBlock key={index} data={codeBlock}/>)
					} else {
						codeBlock.push(element.text)
						return(<CodeBlock key={index} data={codeBlock}/>)
					}
				}
			case "ordered-list-item":
				if (data.blocks.length === 1) {
					olBlock.push(element.text)
					return(<OrderedList key={index} data={olBlock}/>)
				} else if (index === 0) {
					if (data.blocks[index + 1].type === "ordered-list-item") {
						olBlock.push(element.text)
						return
					} else {
						olBlock.push(element.text)
						return(<OrderedList key={index} data={olBlock}/>)
					}
				} else if (index < data.blocks.length - 1) {
					if (data.blocks[index - 1].type !== "ordered-list-item") {
						olBlock = []
						if (data.blocks[index + 1].type === "ordered-list-item") {
							olBlock.push(element.text)
							return
						} else {
							olBlock.push(element.text)
							return(<OrderedList key={index} data={olBlock}/>)
						}
					} else {
						if (data.blocks[index + 1].type === "ordered-list-item") {
							olBlock.push(element.text)
							return
						} else {
							olBlock.push(element.text)
							return(<OrderedList key={index} data={olBlock}/>)
						}
					}
				} else {
					if (data.blocks[index - 1].type !== "ordered-list-item") {
						olBlock = []
						olBlock.push(element.text)
						return(<OrderedList key={index} data={olBlock}/>)
					} else {
						olBlock.push(element.text)
						return(<OrderedList key={index} data={olBlock}/>)
					}
				}
			case "unordered-list-item":
				if (data.blocks.length === 1) {
					ulBlock.push(element.text)
					return(<UnorderedList key={index} data={ulBlock}/>)
				} else if (index === 0) {
					if (data.blocks[index + 1].type === "unordered-list-item") {
						ulBlock.push(element.text)
						return
					} else {
						ulBlock.push(element.text)
						return(<UnorderedList key={index} data={ulBlock}/>)
					}
				} else if (index < data.blocks.length - 1) {
					if (data.blocks[index - 1].type !== "unordered-list-item") {
						ulBlock = []
						if (data.blocks[index + 1].type === "unordered-list-item") {
							ulBlock.push(element.text)
							return
						} else {
							ulBlock.push(element.text)
							return(<UnorderedList key={index} data={ulBlock}/>)
						}
					} else {
						if (data.blocks[index + 1].type === "unordered-list-item") {
							ulBlock.push(element.text)
							return
						} else {
							ulBlock.push(element.text)
							return(<UnorderedList key={index} data={ulBlock}/>)
						}
					}
				} else {
					if (data.blocks[index - 1].type !== "unordered-list-item") {
						ulBlock = []
						ulBlock.push(element.text)
						return(<UnorderedList key={index} data={ulBlock}/>)
					} else {
						ulBlock.push(element.text)
						return(<UnorderedList key={index} data={ulBlock}/>)
					}
				}
			default:
				return (< Unstyled key={index} data={element.styledHTML}/>)
		}
	});
	return blocks;
}