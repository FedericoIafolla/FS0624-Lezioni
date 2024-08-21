import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import books from '../data/books.json'; // Importa il file JSON
import './AllTheBooks.css'; // Importa il file CSS

const AllTheBooks = () => {
  return (
    <Container className="mt-5">
      <Row>
        {books.map((book, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className="mb-4">
              <Card.Img variant="top" src={book.img} className="book-img" />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>${book.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllTheBooks;
