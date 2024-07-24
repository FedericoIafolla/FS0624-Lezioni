// Funzione per creare una card del libro
function createBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('col-md-4');
  
    const cardBody = document.createElement('div');
    cardBody.classList.add('card', 'mb-3');
  
    const cardImage = document.createElement('img');
    cardImage.classList.add('card-img-top');
    cardImage.src = book.img;
  
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = book.title;
  
    const cardPrice = document.createElement('p');
    cardPrice.classList.add('card-text');
    cardPrice.textContent = `Prezzo: ${book.price}€`;
  
    const discardButton = document.createElement('button');
    discardButton.classList.add('btn', 'btn-danger');
    discardButton.textContent = 'Scarta';
    discardButton.addEventListener('click', () => {
      card.remove();
    });
  
    cardBody.appendChild(cardImage);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(discardButton);
    card.appendChild(cardBody);
  
    return card;
  }
  
  // Funzione per popolare la pagina con le card dei libri
  function populateBooks(books) {
    const bookContainer = document.getElementById('book-container');
  
    books.forEach(book => {
      const bookCard = createBookCard(book);
      bookContainer.appendChild(bookCard);
    });
  }
  
  // Effettua la chiamata HTTP GET all'endpoint per ottenere i libri
  fetch('https://striveschool-api.herokuapp.com/books')
    .then(response => response.json())
    .then(books => {
      populateBooks(books);
    })
    .catch(error => {
      console.error('Errore durante la chiamata HTTP:', error);
    });