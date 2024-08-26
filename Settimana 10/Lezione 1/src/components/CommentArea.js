import React, { Component } from 'react';
import CommentsList from './CommentsList';
import AddComment from './AddComment';

class CommentArea extends Component {
  state = {
    comments: [],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.bookId !== this.props.bookId) {
      this.fetchComments();
    }
  }

  fetchComments = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.bookId}`, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGUzNmYyNjBjYzAwMTVjYzBkY2EiLCJpYXQiOjE3MjQzMzM1MTUsImV4cCI6MTcyNTU0MzExNX0.MGo0Yn5FTFSLCkSlHvusJulO0yjboCAmqW5uf3jjmwM",
        },
      });
      if (response.ok) {
        const data = await response.json();
        this.setState({ comments: data });
      } else {
        console.log("Error fetching comments");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDelete = async (commentId) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGUzNmYyNjBjYzAwMTVjYzBkY2EiLCJpYXQiOjE3MjQzMzM1MTUsImV4cCI6MTcyNTU0MzExNX0.MGo0Yn5FTFSLCkSlHvusJulO0yjboCAmqW5uf3jjmwM",
        },
      });
      if (response.ok) {
        this.fetchComments(); // Ricarica i commenti dopo la cancellazione
      } else {
        console.log("Failed to delete comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="comment-area">
        <CommentsList comments={this.state.comments} onDelete={this.handleDelete} />
        <AddComment bookId={this.props.bookId} fetchComments={this.fetchComments} />
      </div>
    );
  }
}

export default CommentArea;
