import React, { Component } from 'react';
import { Row, Col, Container, Form, FormControl } from 'react-bootstrap';
import SingleBook from './SingleBook';
import CommentArea from './CommentArea';
import './BookList.css';  // Importa un file CSS per lo stile personalizzato

class BookList extends Component {
  state = {
    searchQuery: '',
    selectedGenre: 'Tutti',
    selectedBookAsin: null,
  };

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleGenreChange = (event) => {
    this.setState({ selectedGenre: event.target.value });
  };

  handleBookSelect = (asin) => {
    this.setState({ selectedBookAsin: asin });
  };

  render() {
    const { books } = this.props;
    const { searchQuery, selectedGenre } = this.state;

    const filteredBooks = books
      .filter((book) =>
        selectedGenre === 'Tutti' || book.category.toLowerCase() === selectedGenre.toLowerCase()
      )
      .filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      <Container>
        <Row className="mb-4 align-items-center">
          {/* Search bar */}
          <Col md={6}>
            <FormControl
              type="text"
              placeholder="Cerca un libro..."
              value={this.state.searchQuery}
              onChange={this.handleSearch}
              className="custom-search-bar"
            />
          </Col>

          {/* Dropdown per il filtro dei generi */}
          <Col md={6}>
            <Form.Control
              as="select"
              value={this.state.selectedGenre}
              onChange={this.handleGenreChange}
              className="custom-dropdown"
            >
              <option>Tutti</option>
              <option>Fantasy</option>
              <option>Horror</option>
              <option>Romance</option>
              <option>Scifi</option>
              {/* Aggiungi altri generi se necessario */}
            </Form.Control>
          </Col>
        </Row>

        <Row>
          {/* Colonna sinistra con la griglia dei libri */}
          <Col md={8} className="book-list">
            <Row>
              {filteredBooks.map((book) => (
                <Col key={book.asin} md={6} lg={4} className="mb-4">
                  <SingleBook
                    book={book}
                    selectedBookAsin={this.state.selectedBookAsin}
                    onBookSelect={this.handleBookSelect}
                  />
                </Col>
              ))}
            </Row>
          </Col>

          {/* Colonna destra con i commenti */}
          <Col md={4} className="comment-area">
            {this.state.selectedBookAsin ? (
              <CommentArea bookId={this.state.selectedBookAsin} />
            ) : (
              <div className="placeholder-text">Seleziona un libro per visualizzare i commenti</div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BookList;
