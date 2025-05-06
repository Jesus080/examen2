import React, { useEffect, useState } from 'react';
import BookList from './components/BookList';
import ReadBooks from './components/ReadBooks';
import BookFilters from './components/BookFilters';
import BookForm from './components/BookForm';
import { useBookContext } from './context/BookContext';

function App() {
  const { applyFilters } = useBookContext();
  const [bookToEdit, setBookToEdit] = useState(null);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className="container">
      <header>
        <h1>Mi Biblioteca Personal</h1>
        <p>Gestiona tu colección de libros</p>
      </header>
      <main>
        <BookForm bookToEdit={bookToEdit} setBookToEdit={setBookToEdit} />
        <BookFilters />
        <BookList setBookToEdit={setBookToEdit} />
        <ReadBooks />
      </main>
    </div>
  );
}

export default App;