import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import fantasyBooks from './data/fantasy.json';

// Trova un asin esistente per i test
const getTestBookAsin = () => fantasyBooks[0].asin; // Usa il primo asin per i test

// Testa se il componente Welcome viene montato correttamente
test('renders Welcome component', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to EpiBooks!/i);
  expect(welcomeElement).toBeInTheDocument();
});

// Testa se il numero corretto di schede libro viene renderizzato
test('renders correct number of book cards', () => {
  render(<App />);
  const bookCards = screen.getAllByTestId(/book-card-/i);
  expect(bookCards.length).toBe(fantasyBooks.length);
});

// Testa se CommentArea viene renderizzato quando un libro è selezionato
test('renders CommentArea component when a book is selected', async () => {
  render(<App />);

  // Usa un asin esistente per i test
  const testAsin = getTestBookAsin();
  const firstBook = await screen.findByTestId(`book-card-${testAsin}`);
  fireEvent.click(firstBook);

  // Attendere che CommentArea venga renderizzato
  const commentArea = await screen.findByTestId('comment-area');
  expect(commentArea).toBeInTheDocument();
});

// Testa se i libri sono filtrati correttamente in base al genere
test('filters books correctly based on genre', async () => {
  render(<App />);

  // Seleziona un genere dal dropdown
  const dropdown = screen.getByTestId('genre-dropdown');
  fireEvent.change(dropdown, { target: { value: 'Fantasy' } });

  // Attendere che i libri filtrati vengano aggiornati
  await waitFor(() => {
    const filteredBooks = screen.getAllByTestId(/book-card-/i);
    expect(filteredBooks.length).toBeGreaterThan(0); // Assicurati che ci siano libri filtrati
    filteredBooks.forEach(book => {
      expect(book).toHaveTextContent(/Fantasy/i); // Verifica che il contenuto 'Fantasy' sia visibile
    });
  });
});

// Testa se il colore del bordo cambia quando un libro viene selezionato
test('changes border color when a book is selected', async () => {
  render(<App />);

  // Usa un asin esistente per i test
  const testAsin = getTestBookAsin();
  const firstBook = await screen.findByTestId(`book-card-${testAsin}`);
  fireEvent.click(firstBook);

  // Assicurati che il bordo del libro selezionato sia cambiato
  expect(firstBook).toHaveStyle('border: 2px solid blue');
});

// Testa se il colore del bordo del libro precedentemente selezionato ritorna normale quando un nuovo libro è selezionato
test('returns border color of previously selected book to normal when a new book is selected', async () => {
  render(<App />);

  // Usa asin esistenti per i test
  const [firstAsin, secondAsin] = [getTestBookAsin(), fantasyBooks[1].asin];
  const firstBook = await screen.findByTestId(`book-card-${firstAsin}`);
  const secondBook = await screen.findByTestId(`book-card-${secondAsin}`);

  fireEvent.click(firstBook);
  expect(firstBook).toHaveStyle('border: 2px solid blue');

  fireEvent.click(secondBook);
  expect(firstBook).toHaveStyle('border: 1px solid black'); // Verifica il bordo normale
  expect(secondBook).toHaveStyle('border: 2px solid blue');
});

// Testa che il componente SingleComment non venga renderizzato quando nessun libro è selezionato
test('does not render SingleComment component when no book is selected', () => {
  render(<App />);
  const singleComment = screen.queryByTestId('single-comment');
  expect(singleComment).not.toBeInTheDocument();
});

// Testa se i commenti vengono caricati e visualizzati correttamente quando un libro con recensioni è selezionato
test('loads and displays comments when a book with reviews is selected', async () => {
  render(<App />);

  // Usa un asin esistente per i test
  const testAsin = getTestBookAsin();
  const firstBook = await screen.findByTestId(`book-card-${testAsin}`);
  fireEvent.click(firstBook);

  // Attendere che i commenti vengano caricati e visualizzati
  await waitFor(() => {
    const comments = screen.getAllByTestId(/comment-item-/i);
    expect(comments.length).toBeGreaterThan(0); // Verifica se ci sono commenti
  });
});
