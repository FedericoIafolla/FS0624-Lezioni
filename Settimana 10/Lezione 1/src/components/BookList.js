// src/components/BookList.js
import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import SingleBook from './SingleBook';
import fantasyBooks from '../data/fantasy.json';
import horrorBooks from '../data/horror.json';
import historyBooks from '../data/history.json';
import romanceBooks from '../data/romance.json';
import scifiBooks from '../data/scifi.json';

const genres = {
  Fantasy: fantasyBooks,
  Horror: horrorBooks,
  History: historyBooks,
  Romance: romanceBooks,
  SciFi: scifiBooks,
};

const BookList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Fantasy'); // Predefinito su 'Fantasy'

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  // Filtra i libri in base al genere selezionato
  const filteredBooks = genres[selectedGenre].filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Form.Group controlId="searchBar">
        <Form.Label>Search for a book</Form.Label>
        <Form.Control
          type="text"
          placeholder="Type to search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="genreSelect">
        <Form.Label>Select Genre</Form.Label>
        <Form.Select value={selectedGenre} onChange={handleGenreChange}>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="History">History</option>
          <option value="Romance">Romance</option>
          <option value="SciFi">Sci-Fi</option>
        </Form.Select>
      </Form.Group>

      <Row>
        {filteredBooks.map((book, index) => (
          <Col key={index} md={4} className="my-3">
            <SingleBook book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BookList;
