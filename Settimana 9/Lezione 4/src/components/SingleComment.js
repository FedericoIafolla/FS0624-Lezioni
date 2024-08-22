
import React from 'react';
import { ListGroup } from 'react-bootstrap';

const SingleComment = ({ comment }) => (
  <ListGroup.Item>
    <strong>{comment.author}</strong>: {comment.comment} (Rating: {comment.rate})
  </ListGroup.Item>
);

export default SingleComment;
