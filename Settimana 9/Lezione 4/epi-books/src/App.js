// src/App.js
import React from 'react';
import MyNav from './components/MyNav';
import MyFooter from './components/MyFooter';
import Welcome from './components/Welcome';
import BookList from './components/BookList';
import fantasyBooks from './data/fantasy.json'; // Importa uno dei file JSON

function App() {
  return (
    <div>
      <MyNav />
      <Welcome />
      <BookList books={fantasyBooks} />
      <MyFooter />
    </div>
  );
}

export default App;
