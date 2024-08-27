import React, { useState } from 'react';
import { Row, Col, Container, Form, FormControl } from 'react-bootstrap';
import SingleBook from './SingleBook';
import CommentArea from './CommentArea';
import './BookList.css';

const BookList = ({ books }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Tutti');
  const [selectedBookAsin, setSelectedBookAsin] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleBookSelect = (asin) => {
    setSelectedBookAsin(asin);
  };

  const filteredBooks = books
    .filter((book) =>
      selectedGenre === 'Tutti' || book.category.toLowerCase() === selectedGenre.toLowerCase()
    )
    .filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Container>
      <Row className="mb-4 align-items-center">
        <Col md={6}>
          <FormControl
            type="text"
            placeholder="Cerca un libro..."
            value={searchQuery}
            onChange={handleSearch}
            className="custom-search-bar"
          />
        </Col>

        <Col md={6}>
          <Form.Control
            as="select"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="custom-dropdown"
          >
            <option>Tutti</option>
            <option>Fantasy</option>
            <option>Horror</option>
            <option>Romance</option>
            <option>Scifi</option>
          </Form.Control>
        </Col>
      </Row>

      <Row>
        <Col md={8} className="book-list">
          <Row>
            {filteredBooks.map((book) => (
              <Col key={book.asin} md={6} lg={4} className="mb-4">
                <SingleBook
                  book={book}
                  selectedBookAsin={selectedBookAsin}
                  onBookSelect={handleBookSelect}
                />
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={4} className="comment-area">
          {this.state.selectedBookAsin ? (
            <CommentArea bookId={selectedBookAsin} />
          ) : (
            <div className="placeholder-text">Seleziona un libro per visualizzare i commenti</div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default BookList;
