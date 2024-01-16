import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${taskId}`);
      console.log(`Tarea con ID ${taskId} eliminada exitosamente.`);
      // Actualizar el estado después de eliminar la tarea
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      setError('');  // Limpiar cualquier mensaje de error previo
    } catch (error) {
      console.error('Error al eliminar la tarea:', error.message);
      setError('Error al eliminar la tarea. Por favor, intenta nuevamente.');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tasks');
      setTasks(response.data);
      setError('');  // Limpiar cualquier mensaje de error previo
    } catch (error) {
      console.error('Error al obtener las tareas:', error.message);
      setError('Error al obtener las tareas. Por favor, intenta nuevamente.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Lista de Tareas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onTaskDeleted={handleDeleteTask} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
