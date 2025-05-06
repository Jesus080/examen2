import React, { useState, useEffect } from 'react';
import { useBookContext } from '../context/BookContext';
import { FaSave, FaEdit, FaTimes } from 'react-icons/fa'; 

const BookForm = ({ bookToEdit, setBookToEdit }) => {
  const { addBook, updateBook } = useBookContext();
  const initialFormState = { title: '', author: '', genre: '', year: '' };
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bookToEdit) {
      setFormData(bookToEdit);
    } else {
      setFormData(initialFormState);
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!formData.author.trim()) newErrors.author = 'El autor es obligatorio';
    if (!formData.genre.trim()) newErrors.genre = 'El género es obligatorio';
    if (!formData.year || isNaN(formData.year) || formData.year < 0) {
      newErrors.year = 'Ingrese un año válido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (bookToEdit) {
      updateBook(bookToEdit.id, formData);
      setBookToEdit(null);
    } else {
      addBook(formData);
    }
    setFormData(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>{bookToEdit ? 'Editar Libro' : 'Añadir Nuevo Libro'}</h2>
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título"
        />
        {errors.title && <p className="error">{errors.title}</p>}
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Autor"
        />
        {errors.author && <p className="error">{errors.author}</p>}
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Género"
        />
        {errors.genre && <p className="error">{errors.genre}</p>}
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Año"
        />
        {errors.year && <p className="error">{errors.year}</p>}
      </div>
      <div className="form-actions">
        <button type="submit" className="save-button">
          {bookToEdit ? <FaEdit /> : <FaSave />} {bookToEdit ? 'Actualizar' : 'Guardar'}
        </button>
        {bookToEdit && (
          <button
            type="button"
            onClick={() => setBookToEdit(null)}
            className="cancel-button"
          >
            <FaTimes /> Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default BookForm;