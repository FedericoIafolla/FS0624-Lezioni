import React, { Component } from 'react';
import CommentsList from './CommentsList';
import AddComment from './AddComment';
import Loading from './Loading';
import Error from './Error';

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = async () => {
    this.setState({ isLoading: true, error: null });
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.bookId}`, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGUzNmYyNjBjYzAwMTVjYzBkY2EiLCJpYXQiOjE3MjQzMzM1MTUsImV4cCI6MTcyNTU0MzExNX0.MGo0Yn5FTFSLCkSlHvusJulO0yjboCAmqW5uf3jjmwM",
        },
      });
      if (response.ok) {
        const data = await response.json();
        this.setState({ comments: data, isLoading: false });
      } else {
        throw new Error("Failed to fetch comments");
      }
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  deleteComment = async (commentId) => {
    this.setState({ isLoading: true, error: null });
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGUzNmYyNjBjYzAwMTVjYzBkY2EiLCJpYXQiOjE3MjQzMzM1MTUsImV4cCI6MTcyNTU0MzExNX0.MGo0Yn5FTFSLCkSlHvusJulO0yjboCAmqW5uf3jjmwM",
        },
      });
      if (response.ok) {
        this.fetchComments(); // Ricarica i commenti dopo eliminazione
      } else {
        throw new Error("Failed to delete comment");
      }
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  render() {
    const { isLoading, error, comments } = this.state;

    return (
      <div className="comment-area">
        {isLoading && <Loading />}
        {error && <Error message={error} />}
        <CommentsList comments={comments} onDelete={this.deleteComment} />
        <AddComment bookId={this.props.bookId} fetchComments={this.fetchComments} />
      </div>
    );
  }
}

export default CommentArea;
