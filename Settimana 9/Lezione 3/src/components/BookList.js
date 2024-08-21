import React, { useState } from 'react';
import SingleBook from './SingleBook';
import { Container, Row, Col, Form } from 'react-bootstrap';

const BookList = ({ books }) => {
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleBookClick = (book) => {
    setSelectedBook(selectedBook === book ? null : book);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <Form.Control
        type="text"
        placeholder="Search for a book"
        value={search}
        onChange={handleSearchChange}
        className="mb-4"
      />
      <Row>
        {filteredBooks.map((book, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <SingleBook
              book={book}
              onClick={() => handleBookClick(book)}
              isSelected={selectedBook === book}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BookList;
