import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTaskModal from './EditTaskModal'; // Ajusta la ruta según tu estructura de carpetas
import './TaskList.css'

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskUpdate = async (id, newStatus) => {
    try {
      // Obtén la tarea actualizada para asegurarte de incluir el title actual
      const taskToUpdate = tasks.find(task => task.id === id);
  
      // Realiza la solicitud PUT con todos los campos, incluido el title actual
      await axios.put(`http://localhost:3001/api/tasks/${id}`, {
        title: taskToUpdate.title, // Asegúrate de incluir el title actual
        status: newStatus,
      });
  
      // Actualiza la lista después de la modificación
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      console.log('Response data:', error.response.data);
    } finally {
      // Después de la actualización o en caso de error, sal del modo de edición
      setIsEditing(false);
      setEditingTask(null);
    }
  };

  const handleTaskDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`);
      fetchTasks(); // Actualiza la lista después de la eliminación
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleClick = (task) => {
    // Al hacer clic en el botón Toggle, establece el modo de edición y la tarea actual
    setIsEditing(true);
    setEditingTask(task);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => handleToggleClick(task)}>Toggle</button>
            <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
            {isEditing && editingTask && editingTask.id === task.id && (
              <EditTaskModal
                task={editingTask}
                onUpdate={handleTaskUpdate}
                onClose={() => setIsEditing(false)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
