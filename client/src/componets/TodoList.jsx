import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewTaskForm from './NewTaskForm'; // Ajusta la ruta según tu estructura de carpetas
import EditTaskModal from './EditTaskModal'; // Ajusta la ruta según tu estructura de carpetas
import './TodoList.css'

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskUpdate = async (id, newStatus) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      await axios.put(`http://localhost:3001/api/tasks/${id}`, {
        title: taskToUpdate.title,
        status: newStatus,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
      console.log('Response data:', error.response.data);
    } finally {
      setIsEditing(false);
      setEditingTask(null);
    }
  };

  const handleTaskDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleClick = (task) => {
    setIsEditing(true);
    setEditingTask(task);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <NewTaskForm onTaskCreated={handleTaskCreated} />
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
