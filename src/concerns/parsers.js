import React from 'react';
import randKey from './randomKey'

import Heading2 from "../components/postComponents/Heading2"
import Heading3 from "../components/postComponents/Heading3"
import Heading4 from "../components/postComponents/Heading4"
import Unstyled from "../components/postComponents/Unstyled"
import Quote from "../components/postComponents/Quote"
import MillenialQuote from "../components/postComponents/MillenialQuote"
import CodeBlock from "../components/postComponents/CodeBlock"
import OrderedList from "../components/postComponents/OrderedList"
import UnorderedList from "../components/postComponents/UnorderedList"

export const parseInlineStyling = (data) => {
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

export const parseBlockStyling = (data) => {
	const supportedLanguages = ["javascript", "python", "ruby", "html", "jsx", "css", "java"]
	let codeBlock = []
	let olBlock = []
	let ulBlock = []
	let language = ""
	return data.blocks.map((element, index) => {
		switch (element.type) {
			case "header-two": return (<Heading2 key={randKey()} data={element.styledHTML}/>)
			case "header-three": return(<Heading3 key={randKey()} data={element.styledHTML}/>)
			case "header-four": return(<Heading4 key={randKey()} data={element.styledHTML}/>)
			case "blockquote": return(<Quote key={randKey()} data={element.styledHTML}/>)
			case "millenial-quote": return(<MillenialQuote key={randKey()} data={element.styledHTML}/>)
			case "code-block":
				if (data.blocks.length === 1) {
					if (supportedLanguages.includes(element.text)) {
						language = element.text
						codeBlock.push("empty")
					} else {
						language = "not specified/supported"
						codeBlock.push(element.text)
					}
					// language = "javascript"
					return(<CodeBlock key={randKey()} data={codeBlock} language={language}/>)
				} else if (index === 0) {
					if (data.blocks[index + 1].type === "code-block") {
						if (supportedLanguages.includes(element.text)) {
							language = element.text
						} else {
							language = "not specified/supported"
						// language = "javascript"
							codeBlock.push(element.text)
						}
						break
					} else {
						if (supportedLanguages.includes(element.text)) {
							language = element.text
							codeBlock.push("empty")
						} else {
							language = "not specified/supported"
							codeBlock.push(element.text)
						}
						// codeBlock.push(element.text)
						return(<CodeBlock key={randKey()} data={codeBlock} language={language}/>)
					}
				} else if (index < data.blocks.length - 1) {
					if (data.blocks[index - 1].type !== "code-block") {
						codeBlock = []
						language = ""
						if (data.blocks[index + 1].type === "code-block") {
							if (supportedLanguages.includes(element.text)) {
								language = element.text
							} else {
								language = "not specified/supported"
								codeBlock.push(element.text)
							}
							break
						} else {
							if (supportedLanguages.includes(element.text)) {
								language = element.text
								codeBlock.push("empty")
							} else {
								language = "not specified/supported"
								codeBlock.push(element.text)
							}
							// language = "javascript"
							// codeBlock.push(element.text)
							return(<CodeBlock key={randKey()} data={codeBlock} language={language}/>)
						}
					} else {
						if (data.blocks[index + 1].type === "code-block") {
							// language = element.text
							codeBlock.push(element.text)
							break
						} else {
							codeBlock.push(element.text)
							return(<CodeBlock key={randKey()} data={codeBlock} language={language}/>)
						}
					}
				} else {
					if (data.blocks[index - 1].type !== "code-block") {
						codeBlock = []
						if (supportedLanguages.includes(element.text)) {
							language = element.text
							codeBlock.push("empty")
						} else {
							language = "not specified/supported"
							codeBlock.push(element.text)
						}
						// language = "javascript"
						// codeBlock.push(element.text)
						return(<CodeBlock key={randKey()} data={codeBlock} language={language}/>)
					} else {
						codeBlock.push(element.text)
						return(<CodeBlock key={randKey()} data={codeBlock} language={language}/>)
					}
				}
			case "ordered-list-item":
				if (data.blocks.length === 1) {
					olBlock.push(element.text)
					return(<OrderedList key={index} data={olBlock}/>)
				} else if (index === 0) {
					if (data.blocks[index + 1].type === "ordered-list-item") {
						olBlock.push(element.text)
						break
					} else {
						olBlock.push(element.text)
						return(<OrderedList key={randKey()} data={olBlock}/>)
					}
				} else if (index < data.blocks.length - 1) {
					if (data.blocks[index - 1].type !== "ordered-list-item") {
						olBlock = []
						if (data.blocks[index + 1].type === "ordered-list-item") {
							olBlock.push(element.text)
							break
						} else {
							olBlock.push(element.text)
							return(<OrderedList key={randKey()} data={olBlock}/>)
						}
					} else {
						if (data.blocks[index + 1].type === "ordered-list-item") {
							olBlock.push(element.text)
							break
						} else {
							olBlock.push(element.text)
							return(<OrderedList key={randKey()} data={olBlock}/>)
						}
					}
				} else {
					if (data.blocks[index - 1].type !== "ordered-list-item") {
						olBlock = []
						olBlock.push(element.text)
						return(<OrderedList key={randKey()} data={olBlock}/>)
					} else {
						olBlock.push(element.text)
						return(<OrderedList key={randKey()} data={olBlock}/>)
					}
				}
			case "unordered-list-item":
				if (data.blocks.length === 1) {
					ulBlock.push(element.text)
					return(<UnorderedList key={randKey()} data={ulBlock}/>)
				} else if (index === 0) {
					if (data.blocks[index + 1].type === "unordered-list-item") {
						ulBlock.push(element.text)
						break
					} else {
						ulBlock.push(element.text)
						return(<UnorderedList key={randKey()} data={ulBlock}/>)
					}
				} else if (index < data.blocks.length - 1) {
					if (data.blocks[index - 1].type !== "unordered-list-item") {
						ulBlock = []
						if (data.blocks[index + 1].type === "unordered-list-item") {
							ulBlock.push(element.text)
							break
						} else {
							ulBlock.push(element.text)
							return(<UnorderedList key={randKey()} data={ulBlock}/>)
						}
					} else {
						if (data.blocks[index + 1].type === "unordered-list-item") {
							ulBlock.push(element.text)
							break
						} else {
							ulBlock.push(element.text)
							return(<UnorderedList key={randKey()} data={ulBlock}/>)
						}
					}
				} else {
					if (data.blocks[index - 1].type !== "unordered-list-item") {
						ulBlock = []
						ulBlock.push(element.text)
						return(<UnorderedList key={randKey()} data={ulBlock}/>)
					} else {
						ulBlock.push(element.text)
						return(<UnorderedList key={randKey()} data={ulBlock}/>)
					}
				}
			default:
				return (< Unstyled key={randKey()} data={element.styledHTML}/>)
		}
	})
}

export default {parseBlockStyling, parseInlineStyling}