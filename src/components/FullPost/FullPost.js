import React, { Component } from 'react';

import classes from './FullPost.module.css';

class FullPost extends Component {
    render() {
        let post = this.props.post ?
            (
                <div className={classes.FullPost}>
                    <h1>{this.props.post.title}</h1>
                    <p>{this.props.post.body}</p>
                    <div className={classes.Edit}>
                        <button className={classes.Delete} onClick={() => this.props.delete(this.props.post._id)}>Delete</button>
                    </div>
                </div>

            )
            :
            <div className={classes.FullPost}>
                <p>Please select a Post!</p>
            </div>;
        return post;
    }
}

export default FullPost;