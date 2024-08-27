import React, { useState, useEffect } from 'react';
import CommentsList from './CommentsList';
import AddComment from './AddComment';

const CommentArea = ({ bookId }) => {
  const [comments, setComments] = useState([]);


  const fetchComments = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${bookId}`, {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGUzNmYyNjBjYzAwMTVjYzBkY2EiLCJpYXQiOjE3MjQzMzM1MTUsImV4cCI6MTcyNTU0MzExNX0.MGo0Yn5FTFSLCkSlHvusJulO0yjboCAmqW5uf3jjmwM",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.log("Error fetching comments");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGUzNmYyNjBjYzAwMTVjYzBkY2EiLCJpYXQiOjE3MjQzMzM1MTUsImV4cCI6MTcyNTU0MzExNX0.MGo0Yn5FTFSLCkSlHvusJulO0yjboCAmqW5uf3jjmwM",
        },
      });
      if (response.ok) {
        fetchComments(); // Ricarica i commenti dopo la cancellazione
      } else {
        console.log("Failed to delete comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchComments();
    }
  }, [bookId]);

  return (
    <div className="comment-area">
      <CommentsList comments={comments} onDelete={handleDelete} />
      <AddComment bookId={bookId} fetchComments={fetchComments} />
    </div>
  );
}

export default CommentArea;
