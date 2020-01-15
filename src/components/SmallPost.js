import React, { Component } from 'react';

import PostControls from "./postComponents/PostControls";
import AuthorCard from './postComponents/AuthorCard';
import { PostCategories } from '../containers/PostCategories';
import { parseBlockStyling, parseInlineStyling } from '../concerns/parsers'

import "../styles/post.css"
import "../styles/rich.css"

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

	state = {
		isLiked: false,
		isFavorited: false,
		post: null
	}

	fetchPost = () => {

		let post;
		if (this.props.match) {
			fetch(`http://localhost:4000/posts/${this.props.match.params.id}`)
			.then(res => res.json())
			.then(this.buildPost)
			.then(post => this.setState({post}))
			return
		} else {
			post = this.buildPost(this.props.postData)
		}
		this.setState({post: post})
	}

	buildPost = (postData) => {

		const data = JSON.parse(postData.content)

		if (!data) { return (<span>I am empty inside</span>) }
		const dataWithInlineStyling = parseInlineStyling(data)
		const dataToDisplay = parseBlockStyling(dataWithInlineStyling)
		dataToDisplay.push(
			<div className="post-bottom-card">
				<PostCategories categories={[{title: "Science", id: 1}, {title: "Programming", id: 2}, {title: "JavaScript", id: 3}]}/>
				<AuthorCard author={postData.user}/>
			</div>
		)
		return dataToDisplay
	}

	toggleFavorite = () => {
		// SEND A POST FETCH TO FAVORITE THE POST
		this.setState({isFavorited: !this.state.isFavorited})
	}

	toggleLike = () => {
		// SEND A POST FETCH TO LIKE THE POST
		this.setState({isLiked: !this.state.isLiked})
	}

	componentDidMount () {
		this.fetchPost()
	}
	
	renderPost = () => {
		if (!this.props.postData) {
			this.fetchPost()
			return (<h3>Loading posts hehe</h3>)
		} else {
			return this.state.post
		}
	}

	render() {
		return (

				<div className="individual-post">
					{/* {this.buildPost(this.props.posts)} */}
					{this.state.post ? this.state.post : <span>I am empty inside</span>}
					{this.props.user ?
					<PostControls
						isLiked={this.state.isLiked}
						toggleLike={this.toggleLike}
						isFavorited={this.state.isFavorited}
						toggleFavorite={this.toggleFavorite}
						user={this.props.user}
					/>
					:
					null
					}
				</div>
		);
	}
}