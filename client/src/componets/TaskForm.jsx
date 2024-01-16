import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('pendiente');
  const [error, setError] = useState('');

  const handleFormSubmit = async (event) => {
    console.log('onTaskAdded:', onTaskAdded);
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/tasks', { title, status });
      console.log('Tarea creada:', response.data);

      if (response.status === 201) {
        // Actualiza la lista de tareas después de la creación exitosa
        onTaskAdded();
        // Reinicia el estado del título para limpiar el formulario
        setTitle('');
        // Limpia el estado de error
        setError('');
      } else {
        console.error('Error al agregar tarea');
        setError('Error al agregar tarea. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al crear la tarea:', error.message);
      setError('Error al crear la tarea. Por favor, verifica los datos.');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="status">Estado:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
        </select>
      </div>
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default TaskForm;
