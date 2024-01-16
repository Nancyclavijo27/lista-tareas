// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Lógica para obtener tareas desde la API y establecerlas en el estado
  }, []);

  return (
    <ul>
      {/* Renderizar cada tarea usando TaskItem */}
    </ul>
  );
};

export default TaskList;
