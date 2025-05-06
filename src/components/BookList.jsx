import React from 'react';
import { useBookContext } from '../context/BookContext';
import BookItem from './BookItem';

const BookList = ({ setBookToEdit }) => {
  const { filteredBooks } = useBookContext();

  return (
    <div>
      <h2>Lista de Libros</h2>
      {filteredBooks.length === 0 ? (
        <p>No hay libros que mostrar.</p>
      ) : (
        filteredBooks.map((book) => (
          <BookItem key={book.id} book={book} onEdit={setBookToEdit} />
        ))
      )}
    </div>
  );
};

export default BookList;