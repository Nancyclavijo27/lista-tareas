import React from 'react';
import TodoList from './componets/TodoList'; // Ajusta la ruta según tu estructura de carpetas
import './App.css';

const App = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <TodoList />
    </div>
  );
};

export default App;
