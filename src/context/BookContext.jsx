import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []);
  const [filteredBooks, setFilteredBooks] = useLocalStorage('filteredBooks', []);
  const [filters, setFilters] = useLocalStorage('filters', {
    title: '',
    author: '',
    genre: '',
  });

  const applyFilters = (bookList = books, currentFilters = filters) => {
    const { title, author, genre } = currentFilters;

    const filtered = bookList.filter((book) => {
      const matchTitle = !title || book.title.toLowerCase().includes(title.toLowerCase());
      const matchAuthor = !author || book.author.toLowerCase().includes(author.toLowerCase());
      const matchGenre = !genre || book.genre.toLowerCase().includes(genre.toLowerCase());
      return matchTitle && matchAuthor && matchGenre;
    });

    setFilteredBooks(filtered);
  };

  const getReadBooks = () => books.filter((book) => book.read);

  const addBook = (book) => {
    const newBook = { ...book, id: Date.now().toString(), read: false };
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    applyFilters(updatedBooks, filters);
  };

  const updateBook = (id, updatedBook) => {
    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, ...updatedBook } : book
    );
    setBooks(updatedBooks);
    applyFilters(updatedBooks, filters);
  };

  const deleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    applyFilters(updatedBooks, filters);
  };

  const toggleReadStatus = (id) => {
    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, read: !book.read } : book
    );
    setBooks(updatedBooks);
    applyFilters(updatedBooks, filters);
  };

  const value = {
    books,
    filteredBooks,
    filters,
    addBook,
    updateBook,
    deleteBook,
    toggleReadStatus,
    applyFilters,
    getReadBooks,
    setFilters,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};