import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';
import FilmList from './components/FilmList';
import Account from './components/Account';
import TVShows from './components/TVShows'; // Assicurati di avere questo componente
import MovieDetails from './components/MovieDetails'; // Importa il componente MovieDetails

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#212121', minHeight: '100vh', color: 'white' }}>
        <CustomNavbar />
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={
              <>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h1 style={{ fontSize: '2rem', color: 'white', textAlign: 'left' }}>
                    Saghe che dovresti vedere <b>ASSOLUTAMENTE!</b>
                  </h1>
                </div>
                <FilmList title="Rocky Balboa's Collection" query="Rocky" />
                <FilmList title="The Lord Of The Rings" query="Lord Of The Rings" />
                <FilmList title="Indiana Jones's Movies" query="Indiana Jones" />
                <FilmList title="Great Scott!" query="Back To The Future" />
              </>
            } />
            <Route path="/account" element={<Account />} />
            <Route path="/tvshows" element={<TVShows />} /> {/* Aggiungi la rotta per TVShows */}
            <Route path="/movie-details/:movieId" element={<MovieDetails />} /> {/* Aggiungi la rotta per MovieDetails */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
