// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());  // Allow requests from different origins (React app)
app.use(express.json());  // Parse JSON requests

// Sample in-memory "database" for To-Do list items
let todos = [
  { id: 1, task: 'Learn Express.js', completed: false },
  { id: 2, task: 'Build a Full-Stack App', completed: false },
];

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new To-Do
app.post('/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = { id: todos.length + 1, task, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a To-Do
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  const todo = todos.find(t => t.id === parseInt(id));
  if (todo) {
    todo.task = task || todo.task;
    todo.completed = completed !== undefined ? completed : todo.completed;
    res.json(todo);
  } else {
    res.status(404).send('To-Do not found');
  }
});

// Delete a To-Do
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
