// src/components/SingleBook.js
import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import CommentArea from './CommentArea'; // Importa CommentArea
import './SingleBook.css';

class SingleBook extends Component {
  state = {
    selected: false,
  };

  toggleSelected = () => {
    this.setState({ selected: !this.state.selected });
  };

  render() {
    const { book } = this.props;
    return (
      <>
        <Card
          onClick={this.toggleSelected}
          className={`book-card ${this.state.selected ? 'selected' : ''}`}
        >
          <div className="img-container">
            <Card.Img
              variant="top"
              src={book.img}
              className="book-card-img"
            />
          </div>
          <Card.Body className="book-card-body">
            <Card.Title>{book.title}</Card.Title>
          </Card.Body>
        </Card>
        {/* Mostra CommentArea solo se il libro è selezionato */}
        {this.state.selected && <CommentArea bookId={book.asin} />}
      </>
    );
  }
}

export default SingleBook;
