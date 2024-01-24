import { useState } from 'react';
import axios from 'axios';
import './NewTaskForm.css';

// Añadir variable de entorno en el código
const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://apitareas-ni4l.onrender.com/api'
  : 'http://localhost:3001/api';

const NewTaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Siempre crea la tarea con status 'pendiente'
      const response = await axios.post(`${apiUrl}/tasks`, { title, status: 'pendiente' });
      onTaskCreated(response.data); // Actualiza la lista después de la creación
      setTitle('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <h2>Create New Task</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        {/* Elimina el desplegable de Status y establece el valor 'pendiente' directamente */}
        <input type="hidden" name="status" value="pendiente" />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default NewTaskForm;
