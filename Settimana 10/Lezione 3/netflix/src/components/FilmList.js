import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './FilmList.css'; 
import { ClipLoader } from 'react-spinners'; 

const API_KEY = '6953698b';


const EXCLUDED_MOVIES = [
  'tt0073629',
  'tt14993250',
  'tt0131704',
  'tt3410408'
];

function FilmList({ title, query }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie`)
        .then(response => response.json())
        .then(data => {
          // Filtra i film da escludere
          if (data.Response === "True") {
            const filteredMovies = data.Search.filter(movie => !EXCLUDED_MOVIES.includes(movie.imdbID));
            setMovies(filteredMovies);
            setLoading(false);
          } else {
            throw new Error(data.Error);
          }
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [query]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerPadding: '0'
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerPadding: '0'
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerPadding: '0'
        }
      }
    ]
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '' }}>
      <h2 className="carousel-title">{title}</h2>
      {loading ? (
        <div className="loader-container">
          <ClipLoader color="#ffffff" loading={loading} size={50} />
        </div>
      ) : error ? (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      ) : (
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.imdbID} style={{ display: 'flex', justifyContent: 'center', padding: '0 5px' }}>
              <img
                src={movie.Poster}
                alt={movie.Title}
                style={{ width: '100%', height: '300px', objectFit: 'contain', borderRadius: '5px' }}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default FilmList;
