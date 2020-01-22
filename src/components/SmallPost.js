import React, { Component, Fragment } from 'react';
import randKey from "../concerns/randomKey"
import PostControls from "./postComponents/PostControls";
import AuthorCard from './postComponents/AuthorCard';
import { PostCategories } from '../containers/PostCategories';
import Comments from '../containers/Comments';
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
		date: "",
		likes: [],
		favorites: [],
		comments: null,
		categories: []
	}

	fetchPost = () => {

		let post;
		if (this.props.match) {
			fetch(`https://agile-journey-79048.herokuapp.com/posts/${this.props.match.params.id}`)
			.then(res => res.json())
			.then(res => {
				this.setLikes(res.post_likes)
				this.setFavorites(res.post_favorites)
				this.setComments(res.comments)
				return this.buildPost(res)
			})
			.then(post => this.setState({post}))
			.catch(console.log)
			return
		} else {
			post = this.buildPost(this.props.postData)
			this.setLikes(this.props.postData.post_likes)
			this.setFavorites(this.props.postData.post_favorites)
			this.setComments(this.props.postData.comments)
		}
		this.setState({post: post})
	}

	buildPost = (postData) => {

		const data = JSON.parse(postData.content)
		// debugger
		this.setHeading(postData.title)
		this.setCategories(postData.categories)
		this.setDate(postData.created_at)
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

	setCategories = (categories) => {
		this.setState({categories})
	}

	showCategories = () => {
		// return this.state.categories.map(category => {
		// 	return category.title
		// }).join(", ")
		return (<PostCategories categories={this.state.categories} key={randKey()}/>)
	}

	toggleFavorite = () => {
		this.setState({isFavorited: !this.state.isFavorited})
		fetch("https://agile-journey-79048.herokuapp.com/favorite_post",{
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
		fetch("https://agile-journey-79048.herokuapp.com/like_post",{
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

	addComment = (event) => {
		event.preventDefault()
		// debugger
		fetch("https://agile-journey-79048.herokuapp.com/comment",{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${localStorage["token"]}`
			},
			body: JSON.stringify({
				post: {
					content: event.target.elements.commentInput.value,
					user_id: this.props.user.id,
					id: (this.props.match ? this.props.match.params.id : this.props.postData.id)
				}
			})
		})
		.then(res => res.json())
		.then(this.setComments)
		.then(event.target.elements.commentInput.value = "")
	}

	componentDidMount () {
		this.renderPost()
		// debugger
	}

	componentDidUpdate (prevProps, prevState) {
		// debugger
			if (prevProps !== this.props && !this.props.match) {
				// debugger
				this.setState({open: false, post: this.buildPost(this.props.postData)})
				
				// window.scrollTo(0, 0)
			}
			// if (this.state.post === this.buildPost(this.props.postData)) {
			// 	debugger
			// }
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

	setComments = (commentsArray) => {
		// debugger
		if (Array.isArray(commentsArray)) {
			this.setState({comments: commentsArray})
		} else if (typeof commentsArray === "object") {
			if (Array.isArray(this.state.comments)) {
				this.setState({comments: [...this.state.comments, commentsArray]})
			} else {
				this.setState({comments: [commentsArray]})
			}
		}
	}

	setDate = (dateString) => {
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		let dateArray = dateString.split("-")
		let year = dateArray[0]
		let month = dateArray[1]
		// month = months[parseInt(dateArray[1]) -1].toUpperCase()
		let day = dateArray[2].substring(0, 2)
		this.setState({date: `${months[month - 1]} ${day}, ${year}`})
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
			this.setComments(this.props.postData.comments)
			// return this.state.post
		}
	}

	render() {

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
						<span className="post-title-categories">{this.showCategories()}</span>
					}
					<div className={this.state.open ? "title offset-down" : "title"}>{this.state.heading}
						<div className="post-heading-details">
							<div className="post-date">
								<span className="post-date-number">{this.state.favorites.length}</span>☆  //  <span className="post-date-number">{this.state.likes.length}</span>♡
							</div>
							<div className="post-date">
							</div>
							<div className="post-date">
								{this.state.date}
							</div>
						</div>
					</div>
					
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
							<div className="post-comments-container" key={randKey()}>
								<Comments
									userId={this.props.user ? this.props.user.id : this.props.user}
									comments={
										this.state.comments
										? this.state.comments
										:
										
										this.props.postData ? this.props.postData.comments : []
									}
									handleSubmit={this.addComment}
								/>
							</div>
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
						><span className="triangle">▾</span>
					</button>
					}
				</div>
			</Fragment>
		);
	}
}