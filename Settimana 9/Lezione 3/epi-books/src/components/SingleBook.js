import React from 'react';
import { Card } from 'react-bootstrap';

const SingleBook = ({ book, onClick, isSelected }) => {
  return (
    <Card 
      className={`mb-4 ${isSelected ? 'border-danger' : ''}`} 
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <Card.Img variant="top" src={book.img} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SingleBook;
