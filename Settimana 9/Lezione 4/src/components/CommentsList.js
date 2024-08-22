import React from 'react';
import SingleComment from './SingleComment';
import { ListGroup, Button } from 'react-bootstrap';

const CommentsList = ({ comments, onDelete }) => (
  <ListGroup>
    {comments.map(comment => (
      <ListGroup.Item key={comment._id}>
        <SingleComment comment={comment} />
        <Button
          variant="danger"
          onClick={() => onDelete(comment._id)}
          style={{ marginLeft: '10px' }}
        >
          Delete
        </Button>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default CommentsList;
