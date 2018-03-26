import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params; // destructure id from params
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    // Call action creator, w/ callback to redirect to index page
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }
  
  render() {
    const { post } = this.props;

    if(!post) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/" className="btn btn-primary"> Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// ownProps is the props obj that is going to the PostsShow component
function mapStateToProps({ posts }, ownProps) { // destructuring state.posts
  // Return only the single post we need
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
