import React from 'react';
import { useBookContext } from '../context/BookContext';

const BookFilters = () => {
  const { filters, setFilters, applyFilters } = useBookContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    applyFilters(undefined, updatedFilters);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h2>Filtros</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          name="title"
          value={filters.title}
          onChange={handleChange}
          placeholder="Filtrar por título"
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          name="author"
          value={filters.author}
          onChange={handleChange}
          placeholder="Filtrar por autor"
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          name="genre"
          value={filters.genre}
          onChange={handleChange}
          placeholder="Filtrar por género"
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
    </div>
  );
};

export default BookFilters;