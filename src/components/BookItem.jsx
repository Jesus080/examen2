import React from 'react';
import { useBookContext } from '../context/BookContext';

const BookItem = ({ book, onEdit }) => {
  const { deleteBook, toggleReadStatus } = useBookContext();

  return (
    <div className="card">
      <h3>{book.title}</h3>
      <p>Autor: {book.author}</p>
      <p>Género: {book.genre}</p>
      <p>Año: {book.year}</p>
      <div className="card-actions">
        <button onClick={() => toggleReadStatus(book.id)} className="read">
          {book.read ? 'Marcar como no leído' : 'Marcar como leído'}
        </button>
        <button onClick={() => onEdit(book)} className="edit">Editar</button>
        <button onClick={() => deleteBook(book.id)} className="delete">Eliminar</button>
      </div>
    </div>
  );
};

export default BookItem;