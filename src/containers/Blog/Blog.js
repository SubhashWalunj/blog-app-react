import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import classes from './Blog.module.css';

import Urls from '../../constants/url.constant';



class Blog extends Component {
    state = {
        posts: [],
        blogsFetchErrored: false,
        selectedPost: null
    }

    fetchAllBlogs = () => {
        axios.get(`${Urls.BLOG_SERVICE}/blogs`)
            .then(res => {
                this.setState({
                    posts: res.data,
                    blogsFetchErrored: false
                });
            })
            .catch(error => {
                this.setState({
                    posts: [],
                    blogsFetchErrored: true
                })
            });
    }

    componentDidMount() {
        this.fetchAllBlogs();
    }

    postClickHandler = (id) => {
        this.setState({
            selectedPost: this.state.posts.find(post => post._id === id)
        });
    }

    postDeleteHandler = (id) => {
        if (id) {
            axios.delete(`${Urls.BLOG_SERVICE}/blogs/${id}`)
                .then(res => {
                    alert('The post is deleted successfully.');
                    this.setState({
                        selectedPost: null
                    });
                    this.fetchAllBlogs();
                })
                .catch(error => {
                    alert('Error occured while deleting the post.');
                    console.log(error);
                });
        }
    }



    render() {
        let posts = null;
        if (this.state.blogsFetchErrored) {
            posts = <p>There is an error occured while fetching blogs!</p>;
        } else if (!this.state.posts.length) {
            posts = <p>There are no posts available to display</p>
        }
        else {
            posts = this.state.posts.map(post => <Post
                key={post._id}
                id={post._id}
                title={post.title}
                author={post.author}
                clicked={this.postClickHandler}
            />)
        }

        return (
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <section>
                    <FullPost
                        post={this.state.selectedPost}
                        delete={this.postDeleteHandler}
                    />
                </section>
                <section>
                    <NewPost refreshBlogs={this.fetchAllBlogs} />
                </section>
            </div>
        );
    }
}

export default Blog;