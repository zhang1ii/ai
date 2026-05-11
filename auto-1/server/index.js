const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let tasks = [];
let taskIdCounter = 1;

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const task = {
    id: taskIdCounter++,
    title,
    description: description || '',
    status: 'todo',
    createdAt: new Date().toISOString()
  };
  
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { status, title, description } = req.body;
  
  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  if (status && ['todo', 'in-progress', 'done'].includes(status)) {
    task.status = status;
  }
  if (title !== undefined) {
    task.title = title;
  }
  if (description !== undefined) {
    task.description = description;
  }
  
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const deletedTask = tasks.splice(index, 1)[0];
  res.json(deletedTask);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});