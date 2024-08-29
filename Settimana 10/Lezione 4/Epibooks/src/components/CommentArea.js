import React, { useState, useEffect, useCallback } from 'react';
import CommentsList from './CommentsList';
import AddComment from './AddComment';

const CommentArea = ({ bookId }) => {
  const [comments, setComments] = useState([]);

  // Utilizziamo useCallback per memorizzare la funzione fetchComments
  const fetchComments = useCallback(async () => {
    if (!bookId) return; // Preveniamo fetch se bookId non è disponibile

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
        console.error("Error fetching comments:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
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
        fetchComments(); // Ricarica i commenti dopo la cancellazione
      } else {
        console.error("Failed to delete comment:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    fetchComments(); // Ricarica i commenti quando bookId cambia
  }, [bookId, fetchComments]);

  return (
    <div className="comment-area" data-testid="comment-area">
      {comments.length > 0 ? (
        <CommentsList comments={comments} onDelete={handleDelete} />
      ) : (
        <div>No comments available</div>
      )}
      <AddComment bookId={bookId} fetchComments={fetchComments} />
    </div>
  );
};

export default CommentArea;