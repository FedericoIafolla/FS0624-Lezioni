import React from 'react';
import { Card } from 'react-bootstrap';
import './SingleBook.css';  // Importa un file CSS per le personalizzazioni stilistiche

const SingleBook = ({ book, selectedBookAsin, onBookSelect }) => {
  return (
    <Card
      onClick={() => onBookSelect(book.asin)}
      className={`single-book-card ${selectedBookAsin === book.asin ? 'selected' : ''}`}
    >
      <Card.Img variant="top" src={book.img} className="book-image" />
      <Card.Body>
        <Card.Title className="book-title">{book.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SingleBook;
