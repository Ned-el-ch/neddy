import React, { Component, Fragment } from 'react';
import randKey from "../concerns/randomKey"
import PostControls from "./postComponents/PostControls";
import AuthorCard from './postComponents/AuthorCard';
import { PostCategories } from '../containers/PostCategories';
import { parseBlockStyling, parseInlineStyling } from '../concerns/parsers'
import Collapse from "react-bootstrap/Collapse"
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
		post: null,
		open: true,
		heading: "",
		likes: [],
		favorites: [],
		comments: []
	}

	fetchPost = () => {

		let post;
		if (this.props.match) {
			fetch(`http://localhost:4000/posts/${this.props.match.params.id}`)
			.then(res => res.json())
			.then(res => {
				this.setState({
					comments: res.comments
				});
				this.setLikes(res.post_likes)
				this.setFavorites(res.post_favorites)
				return this.buildPost(res)
			})
			.then(post => this.setState({post}))
			.catch(console.log)
			return
		} else {
			post = this.buildPost(this.props.postData)
			this.setLikes(this.props.postData.post_likes)
			this.setFavorites(this.props.postData.post_favorites)
		}
		this.setState({post: post})
	}

	buildPost = (postData) => {

		const data = JSON.parse(postData.content)
		// debugger
		this.setHeading(postData.title)
		if (!data) { return (<span>I am empty inside</span>) }
		const dataWithInlineStyling = parseInlineStyling(data)
		const dataToDisplay = parseBlockStyling(dataWithInlineStyling)
		dataToDisplay.push(
			<div className="post-bottom-card" key={randKey()}>
				<PostCategories categories={postData.categories} key={randKey()}/>
				<AuthorCard author={postData.user} key={randKey()}/>
			</div>
		)
		return dataToDisplay
	}

	setHeading = (heading) => {
		this.setState({heading})
	}

	toggleFavorite = () => {
		this.setState({isFavorited: !this.state.isFavorited})
		fetch("http://localhost:4000/favorite_post",{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${localStorage["token"]}`
			},
			body: JSON.stringify({
				post: {
					id: (this.props.match ? this.props.match.params.id : this.props.postData.id),
					user_id: this.props.user.id
				}
			})
		})
		.then(res => res.json())
		.then(this.setFavorites)
		.catch(console.log)

	}

	toggleLike = () => {
		this.setState({isLiked: !this.state.isLiked})
		fetch("http://localhost:4000/like_post",{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${localStorage["token"]}`

			},
			body: JSON.stringify({
				post: {
					id: (this.props.match ? this.props.match.params.id : this.props.postData.id),
					user_id: this.props.user.id
				}
			})
		})
		.then(res => res.json())
		.then(this.setLikes)
		.catch(console.log)

	}

	componentDidMount () {
		this.renderPost()
	}
	componentDidUpdate (prevProps, prevState) {
		// debugger
			if (prevProps !== this.props) {
				this.setState({open: false})
				window.scrollTo(0, 0)
			}
	}

	setFavorites = (favoritesArray) => {
		const favorites = favoritesArray.map(favorite => {
			return favorite.user_id
		})
		if (this.props.user) {
			this.setState({favorites, isFavorited: favorites.includes(this.props.user.id)})
		} else {
			this.setState({favorites})
		}
	}

	setLikes = (likesArray) => {
		const likes = likesArray.map(like => {
			return like.user_id
		})
		if (this.props.user) {
			this.setState({likes, isLiked: likes.includes(this.props.user.id)})
		} else {
			this.setState({likes})
		}
	}

	renderPost = () => {
		if (!this.props.postData) {
			// debugger
			this.fetchPost()
			return (<h3>Loading posts hehe</h3>)
		} else {
			const post = this.buildPost(this.props.postData)
			// debugger
			this.setState({post, open: this.props.open})
			this.setLikes(this.props.postData.post_likes)
			this.setFavorites(this.props.postData.post_favorites)
			// return this.state.post
		}
	}

	render() {

		// THIS SHOULD INHERIT THE GLOBAL STATE USER AND IF IT EXISTS CHECK IF 
		// THAT USER ID MATCHES ANY OF THE LIKES/FAVORITES AND SET THE ACTIVE
		// ON THE LOTTIES TO TRUE/FALSE SO WHEN THE POST LOADS THEY DISPLAY CORRECTLY
		return (
			<Fragment>
				<div className="new-post">
					{this.state.open
						?
						<button
							onClick={() => this.setState({open: !this.state.open})}
							aria-controls="post"
							aria-expanded={this.state.open}
							className="show-less-button"
							><span className="underlined">Show Less</span>
						</button>
						:
						null
					}
					<div className={this.state.open ? "title offset-down" : "title"}>{this.state.heading}</div>
					<Collapse in={this.state.open}>
						<div className="individual-post" id="post">
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
					</Collapse>
					{this.state.open ?
					null
					:
					<button
						onClick={() => this.setState({open: !this.state.open})}
						aria-controls="post"
						aria-expanded={this.state.open}
						className="read-more-button"
						><span>▾</span>
					</button>
					}
				</div>
			</Fragment>
		);
	}
}