import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './CommentArea.css';

const AddComment = ({ bookId, fetchComments }) => {
  const [commentData, setCommentData] = useState({
    comment: "",
    rate: 1,
    author: "Anonymous",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCommentData({ ...commentData, [name]: value });
  };

  const submitComment = async (event) => {
    event.preventDefault();

    const newComment = {
      comment: commentData.comment,
      rate: commentData.rate,
      elementId: bookId,
    };

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGUzNmYyNjBjYzAwMTVjYzBkY2EiLCJpYXQiOjE3MjQzMzM1MTUsImV4cCI6MTcyNTU0MzExNX0.MGo0Yn5FTFSLCkSlHvusJulO0yjboCAmqW5uf3jjmwM", // Sostituisci con il tuo token
        },
      });

      if (response.ok) {
        alert("Comment added!");
        fetchComments(); // Ricarica i commenti dopo l'aggiunta
        setCommentData({ comment: "", rate: 1 }); // Resetta il modulo
      } else {
        alert("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Form onSubmit={submitComment} data-testid="add-comment-form">
      <Form.Group>
        <Form.Label>Comment</Form.Label>
        <Form.Control
          type="text"
          name="comment"
          value={commentData.comment}
          onChange={handleInputChange}
          placeholder="Write your comment here"
          required
          data-testid="comment-input"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rating</Form.Label>
        <Form.Control
          as="select"
          name="rate"
          value={commentData.rate}
          onChange={handleInputChange}
          data-testid="rating-select"
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Form.Group>
      <Button className="btn-submit" type="submit" data-testid="submit-button">
        Submit
      </Button>
    </Form>
  );
};

export default AddComment;