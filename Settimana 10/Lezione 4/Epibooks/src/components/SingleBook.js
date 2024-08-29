import React from 'react';
import { Card } from 'react-bootstrap';
import './SingleBook.css';  // Importa un file CSS per le personalizzazioni stilistiche

const SingleBook = ({ book, selectedBookAsin, onBookSelect, 'data-testid': testId }) => {
  // Verifica se il libro è selezionato
  const isSelected = selectedBookAsin === book.asin;

  return (
    <Card
      onClick={() => onBookSelect(book.asin)}
      className={`single-book-card ${isSelected ? 'selected' : ''}`}
      data-testid={testId}  // Applica il data-testid basato sull'asin
      style={{
        border: isSelected ? '2px solid blue' : '1px solid black',  // Modifica il colore del bordo in base alla selezione
        cursor: 'pointer'
      }}
    >
      <Card.Img variant="top" src={book.img} className="book-image" />
      <Card.Body>
        <Card.Title className="book-title">{book.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SingleBook;
