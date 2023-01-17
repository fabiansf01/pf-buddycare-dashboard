import React, { useState } from 'react';
import axios from 'axios';

const Gestoradjuntos = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('archivo', files);

    axios.post('www.fpsoft.com.ar/pfsubefotos/subearchivos.php', formData)
      .then(response => {
        console.log(response);
        setError(null);
      })
      .catch(error => {
        console.error(error);
        setError('Error al subir las imágenes');
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
      <button type="submit">Subir imágenes</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Gestoradjuntos;
