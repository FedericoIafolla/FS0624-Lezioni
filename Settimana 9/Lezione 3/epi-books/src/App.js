import React from 'react';
import './App.css';
import MyNav from './components/MyNav';
import MyFooter from './components/MyFooter';
import Welcome from './components/Welcome';
import BookList from './components/BookList'; // Importa BookList
import books from './data/books.json'; // Importa i dati dei libri

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <MyNav />        {/* Navigazione */}
      <Welcome />      {/* Messaggio di benvenuto */}
      <BookList books={books} />  {/* Lista dei libri dal file JSON */}
      <MyFooter />     {/* Footer */}
    </div>
  );
}

export default App;
