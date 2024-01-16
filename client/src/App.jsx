import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './componets/TodoList'; // Ajusta la ruta según tu estructura de carpetas
import NewTaskForm from './componets/NewTaskForm'; // Ajusta la ruta según tu estructura de carpetas
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    // Llama a fetchTasks después de montar el componente
    fetchTasks();
  }, []); // El segundo argumento [] indica que esto solo se ejecuta una vez al montar el componente

  const handleTaskCreated = async (newTask) => {
    try {
      // Agregar la nueva tarea a la lista local
      setTasks((prevTasks) => [...prevTasks, newTask]);

      // Después de agregar la nueva tarea, no es necesario volver a obtener todas las tareas,
      // ya que ya tenemos la nueva tarea en el estado local
    } catch (error) {
      console.error('Error handling created task:', error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <NewTaskForm onTaskCreated={handleTaskCreated} />
      <TodoList tasks={tasks} />
    </div>
  );
};

export default App;
