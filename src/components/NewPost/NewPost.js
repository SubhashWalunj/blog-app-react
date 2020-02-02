import React, { Component } from 'react';
import axios from 'axios';
import Urls from '../../constants/url.constant';

import classes from './NewPost.module.css';

class NewPost extends Component {
    state = {
        title: '',
        body: '',
        author: ''
    }

    addPost = () => {
        if (this.state.title && this.state.body && this.state.author) {
            axios.post(`${Urls.BLOG_SERVICE}/blogs`, this.state)
                .then(res => {
                    alert('The post is added successfully.');
                    this.setState({
                        title: '',
                        body: '',
                        author: ''
                    });
                    this.props.refreshBlogs();
                })
                .catch(error => {
                    alert('Error occured while adding the post.');
                    console.log(error);
                });
        }
    }

    render() {
        const isValidNewPost = this.state.title && this.state.body && this.state.author;
        return (
            <div className={classes.NewPost}>
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                <label>Content</label>
                <textarea rows="4" value={this.state.body} onChange={(event) => this.setState({ body: event.target.value })} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
                    <option value="">Select Author</option>
                    <option value="Subhash Walunj">Subhash Walunj</option>
                    <option value="Jon Doe">Jon Doe</option>
                    <option value="Martin King">Martin King</option>
                </select>
                <button disabled={!isValidNewPost} onClick={this.addPost}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;