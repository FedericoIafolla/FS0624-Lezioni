import React, { Component } from 'react';
import SingleBookClass from './SingleBookClass'; // Importa il componente di classe
import books from '../data/books.json'; // Importa i libri dal JSON

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm } = this.state;
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="book-list">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={this.handleSearchChange}
          className="search-input"
        />
        <div className="books-container">
          {filteredBooks.map((book, index) => (
            <SingleBookClass key={index} book={book} />
          ))}
        </div>
      </div>
    );
  }
}

export default BookList;
