import { useState, useEffect } from 'react'
import TaskBoard from './components/TaskBoard'
import AddTaskModal from './components/AddTaskModal'

const API_BASE = '/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE}/tasks`)
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const addTask = async (title, description) => {
    try {
      const response = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })
      const newTask = await response.json()
      setTasks([...tasks, newTask])
      setShowModal(false)
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
      const updatedTask = await response.json()
      setTasks(tasks.map(task => 
        task.id === taskId ? updatedTask : task
      ))
    } catch (error) {
      console.error('Error updating task status:', error)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: 'DELETE',
      })
      setTasks(tasks.filter(task => task.id !== taskId))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <div className="app">
      <h1 className="app-header">任务看板</h1>
      <TaskBoard 
        tasks={tasks}
        onAddTaskClick={() => setShowModal(true)}
        onUpdateStatus={updateTaskStatus}
        onDeleteTask={deleteTask}
      />
      {showModal && (
        <AddTaskModal 
          onAddTask={addTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default App