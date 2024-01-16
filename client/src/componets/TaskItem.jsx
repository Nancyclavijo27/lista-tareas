import React, { useState } from 'react';
import './TaskList.css';

const TaskItem = ({ task, onTaskDeleted }) => {
  const [completed, setCompleted] = useState(task.status === 'completada');

  const handleToggleStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: completed ? 'pendiente' : 'completada' }),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar el estado de la tarea. Código de estado: ${response.status}`);
      }

      setCompleted(!completed);
    } catch (error) {
      console.error('Error al actualizar el estado de la tarea:', error.message);
    }
  };

  const handleDeleteTask = async () => {
    try {

      if (!task || !task.id) {
        console.error('La tarea o su identificador no está definido.');
        return;
      }
  
      const response = await fetch(`http://localhost:3001/api/tasks/${task.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Si la solicitud de eliminación es exitosa, llamar a onTaskDeleted con el taskId
        onTaskDeleted(task.id);
      } else {
        console.error('Error al eliminar tarea');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <li>
      <span>{task.title}</span>
      <span
        style={{ cursor: 'pointer', color: completed ? 'green' : 'red' }}
        onClick={handleToggleStatus}
      >
        {completed ? 'Completada' : 'Pendiente'}
      </span>
      <button onClick={handleDeleteTask}>Eliminar</button>
    </li>
  );
};

export default TaskItem;

