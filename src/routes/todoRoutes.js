import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get all todos for a user
router.get('/:userId/todos', (req, res) => {
  const { userId } = req.params;
  const stmt = db.prepare('SELECT * FROM todos WHERE user_id = ?');
  const todos = stmt.all(userId);
  res.json(todos);
});

// Add a new todo for a user
router.post('/:userId/todos', (req, res) => {
  const { userId } = req.params;
  const { task } = req.body;
  const stmt = db.prepare('INSERT INTO todos (user_id, task) VALUES (?, ?)');
  const info = stmt.run(userId, task);
  res.status(201).json({ id: info.lastInsertRowid, user_id: userId, task, completed: 0 });
});

// Update a todo
router.put('/:id', (req, res) => {
  const { todoId } = req.params;
  const { task, completed } = req.body;
  const stmt = db.prepare('UPDATE todos SET task = ?, completed = ? WHERE id = ?');
  stmt.run(task, completed ? 1 : 0, todoId);
  res.json({ id: todoId, task, completed });
});

// Delete a todo
router.delete('/:id', (req, res) => {
  const { todoId } = req.params;
  const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
  stmt.run(todoId);
  res.status(204).end();
});

export default router;