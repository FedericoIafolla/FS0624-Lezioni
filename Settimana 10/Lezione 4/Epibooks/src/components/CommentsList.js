import React from 'react';
import SingleComment from './SingleComment';
import { ListGroup, Button } from 'react-bootstrap';
import './CommentsList.css'; // Assicurati che il CSS sia importato correttamente

const CommentsList = ({ comments, onDelete }) => (
  <ListGroup>
    {comments.map(comment => (
      <ListGroup.Item key={comment._id} className="comment-list-item">
        <SingleComment comment={comment} />
        <Button
          className="btn btn-danger btn-delete" // Applica la classe corretta
          onClick={() => onDelete(comment._id)}
        >
          Delete
        </Button>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default CommentsList;
