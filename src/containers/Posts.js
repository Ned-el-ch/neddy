import React, { Component } from 'react';
import SmallPost from '../components/SmallPost';

export default class Posts extends Component {


	render() {

		return (

			<div>

				{this.props.posts.map(postData => {
					return(< SmallPost postData={postData} key={postData.id}/>)
				})}

			</div>

		);

	};

};