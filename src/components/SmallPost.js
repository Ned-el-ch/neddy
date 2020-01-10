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
			return data.blocks.map(block => {
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
					return outputArray.join("");
				}
			})
		}
					// const ranges = block.inlineStyleRanges.map(element => {
					// 	element.total = element.offset + element.length
					// 	return element
					// });
					// const orderedRangesByTotal = sortByKey(ranges, "total")
					// const orderedRangesByOffset = sortByKey(block.inlineStyleRanges, "offset")
					// debugger
					// orderedRangesByOffset.map((range, index) => {
					// 	switch (range.style) {
					// 		case "BOLD":
					// 			return letterArray.splice(range.offset + index, 0, spanBold)
					// 		case "CODE":
					// 			return letterArray.splice(range.offset + index, 0, spanCode)
					// 		case "ITALIC":
					// 			return letterArray.splice(range.offset + index, 0, spanItalics)
					// 		case "UNDERLINE":
					// 			return letterArray.splice(range.offset + index, 0, spanUnderline)
					// 		case "STRIKETHROUGH":
					// 			return letterArray.splice(range.offset + index, 0, spanStrikethrough)
					// 		default:
					// 			return;
					// 	}
					// })
					// debugger
					// orderedRangesByTotal.map((range, index) => {
					// 	const reversedRange = orderedRangesByTotal[orderedRangesByTotal.length - 1 - index]
					// 	// debugger
					// 	letterArray.splice(reversedRange["total"] + orderedRangesByTotal.length - index , 0, closeSpan)
					// })
					// debugger



		const parseBlockStyling = (data) => {
			
			
			
		}
		
		const initialParsedData = parseInlineStyling(data)
		return(<div dangerouslySetInnerHTML={{__html: initialParsedData}}></div>)
		// debugger;
		// const secondaryParsedData = parseBlockStyling(initialParsedData)
		// return secondaryParsedData;
		// const oof = (convertFromRaw(data))
		// const owie = stateToHTML(oof)
		// debugger;
		console.log(data)
		// let codeBlock = []
		// return data.blocks.map((element, index) => {
		// 	switch (element.type) {
		// 		case "header-two":
		// 			return (<h2 className="Draftail-block--header-two" key={index}>{element.text}</h2>)
		// 		case "header-three":
		// 			return(<h2 className="Draftail-block--header-three" key={index}>{element.text}</h2>)
		// 		case "code-block":

		// 			if (index < data.blocks.length-1 && data.blocks[index + 1].type === "code-block") {

		// 				codeBlock.push(element.text)

		// 			} else if (index = data.blocks.length-1) {

		// 				codeBlock.push(element.text)
		// 				return(
		// 					<pre className="code-block-container" key={index}>
		// 						<code
		// 							className="code-block-line"
		// 							dangerouslySetInnerHTML={
		// 								{__html: Prism.highlight(
		// 									codeBlock.join("\n"),
		// 									Prism.languages.javascript,
		// 									"javascript"
		// 									)
		// 								}
		// 							}
		// 						>
		// 						</code>
		// 						<br/>
		// 					</pre>
		// 				)

		// 			} else {

		// 				return(
		// 					<pre className="code-block-container" key={index}>
		// 						<code
		// 							className="code-block-line"
		// 							dangerouslySetInnerHTML={
		// 								{__html: Prism.highlight(
		// 									codeBlock.join("\n"),
		// 									Prism.languages.javascript,
		// 									"javascript"
		// 									)
		// 								}
		// 							}
		// 						>
		// 						</code>
		// 						<br/>
		// 					</pre>
		// 				)

		// 			}

		// 		default:
		// 			return (<p className="Draftail-block--unstyled" key={index}>{element.text}</p>)
		// 	}
		// });
	}
	render() {
		return (
			<div >
				{this.buildPost(this.props.postData)}
			</div>
		);
	}
}

export default SmallPost;
