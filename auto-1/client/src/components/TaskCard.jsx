import { useState } from 'react'

function TaskCard({ task, onDelete }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id.toString())
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div 
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h3 className="task-card-title">{task.title}</h3>
      {task.description && (
        <p className="task-card-description">{task.description}</p>
      )}
      <div className="task-card-footer">
        <span className="task-date">{formatDate(task.createdAt)}</span>
        <button 
          className="delete-btn" 
          onClick={() => onDelete(task.id)}
        >
          删除
        </button>
      </div>
    </div>
  )
}

export default TaskCard