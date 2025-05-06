import React from 'react';
import { useBookContext } from '../context/BookContext';

const ReadBooks = () => {
  const { getReadBooks } = useBookContext();
  const readBooks = getReadBooks();

  return (
    <div>
      <h2>Libros Leídos</h2>
      {readBooks.length === 0 ? (
        <p>No hay libros marcados como leídos.</p>
      ) : (
        <ul>
          {readBooks.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReadBooks;