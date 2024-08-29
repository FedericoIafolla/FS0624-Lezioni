// src/App.js
import React from 'react';
import MyNav from './components/MyNav';
import MyFooter from './components/MyFooter';
import Welcome from './components/Welcome';
import BookList from './components/BookList';
import fantasyBooks from './data/fantasy.json'; // Assicurati che il file JSON esista
import './App.css'; // Assicurati che questo import esista

function App() {
  return (
    <div data-testid="app-container"> {/* Aggiunto data-testid per il container principale */}
      <MyNav />
      <Welcome />
      <BookList books={fantasyBooks} />
      <MyFooter />
    </div>
  );
}

export default App;
