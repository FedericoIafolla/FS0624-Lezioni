// src/components/AllTheBooks.js
import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

// Importiamo i vari file JSON
import fantasyBooks from '../data/fantasy.json';
import horrorBooks from '../data/horror.json';
import historyBooks from '../data/history.json';
import romanceBooks from '../data/romance.json';
import scifiBooks from '../data/scifi.json';

const AllTheBooks = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    // Uniamo tutti i libri da vari file JSON in un'unica lista
    const allBooks = [
      ...fantasyBooks,
      ...horrorBooks,
      ...historyBooks,
      ...romanceBooks,
      ...scifiBooks,
    ];
    setBookList(allBooks);
  }, []);

  return (
    <Container>
      <Row>
        {bookList.map((book, index) => (
          <Col key={index} md={4} className="my-3">
            <Card>
              <Card.Img variant="top" src={book.img} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.author}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllTheBooks;
