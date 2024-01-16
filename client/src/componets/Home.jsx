import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const Home = () => {
  // Función para manejar la tarea añadida
  const handleTaskAdded = () => {
    console.log('Tarea añadida con éxito');  // Puedes realizar otras acciones aquí
    // Actualizar el estado u otras lógicas después de añadir una tarea
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      {/* Pasar la función handleTaskAdded al componente TaskForm */}
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList />
    </div>
  );
};

export default Home;
