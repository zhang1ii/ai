import { useState } from 'react'
import TaskCard from './TaskCard'

function Column({ columnId, title, tasks, onAddTaskClick, onUpdateStatus, onDeleteTask }) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const taskId = parseInt(e.dataTransfer.getData('taskId'))
    if (taskId) {
      onUpdateStatus(taskId, columnId)
    }
  }

  const isTodoColumn = columnId === 'todo'

  return (
    <div 
      className={`column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <h2 className="column-title">{title}</h2>
        {isTodoColumn && (
          <button className="add-btn" onClick={onAddTaskClick}>
            +
          </button>
        )}
      </div>
      <div className="task-list">
        {tasks.map(task => (
          <TaskCard 
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  )
}

export default Column