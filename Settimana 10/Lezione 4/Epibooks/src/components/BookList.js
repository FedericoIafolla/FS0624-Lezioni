import React, { useState } from 'react';
import { Row, Col, Container, Form, FormControl } from 'react-bootstrap';
import SingleBook from './SingleBook';
import CommentArea from './CommentArea';
import './BookList.css';

const BookList = ({ books }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Tutti');
  const [selectedBookAsin, setSelectedBookAsin] = useState(null);

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
            data-testid="search-bar" // Aggiunto data-testid per il campo di ricerca
          />
        </Col>

        <Col md={6}>
          <Form.Control
            as="select"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="custom-dropdown"
            data-testid="genre-dropdown" // Aggiunto data-testid per il dropdown dei generi
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
                  data-testid={`book-card-${book.asin}`} // Aggiunto data-testid per la scheda libro
                />
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={4} className="comment-area">
          {selectedBookAsin ? (
            <CommentArea bookId={selectedBookAsin} />
          ) : (
            <div className="placeholder-text">Seleziona un libro per visualizzare i commenti</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookList;
