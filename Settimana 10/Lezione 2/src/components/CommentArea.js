import React, { useState, useEffect, useCallback } from 'react';
import CommentsList from './CommentsList';
import AddComment from './AddComment';

const CommentArea = ({ bookId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(async () => {
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
        console.error("Error fetching comments");
      }
    } catch (error) {
      console.error(error);
    }
  }, [bookId]);

  const handleDelete = async (commentId) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGUzNmYyNjBjYzAwMTVjYzBkY2EiLCJpYXQiOjE3MjQzMzM1MTUsImV4cCI6MTcyNTU0MzExNX0.MGo0Yn5FTFSLCkSlHvusJulO0yjboCAmqW5uf3jjmwM",
        },
      });
      if (response.ok) {
        fetchComments();
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchComments();
    }
  }, [bookId, fetchComments]);

  return (
    <div className="comment-area">
      <CommentsList comments={comments} onDelete={handleDelete} />
      <AddComment bookId={bookId} fetchComments={fetchComments} />
    </div>
  );
}

export default CommentArea;
