// models/taskModel.js
const { Pool } = require('pg');
const pool = new Pool();

const getTasks = async () => {
  const result = await pool.query('SELECT * FROM tasks');
  return result.rows;
};

const createTask = async (title, state) => {
  const result = await pool.query('INSERT INTO tasks (title, state) VALUES ($1, $2) RETURNING *', [title, state]);
  return result.rows[0];
};

const updateTask = async (taskId, state) => {
  const result = await pool.query('UPDATE tasks SET state = $1 WHERE id = $2 RETURNING *', [state, taskId]);
  return result.rows[0];
};

const deleteTask = async (taskId) => {
  const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [taskId]);
  return result.rows[0];
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
