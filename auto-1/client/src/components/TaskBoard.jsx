import Column from './Column'

const COLUMNS = [
  { id: 'todo', title: '待办' },
  { id: 'in-progress', title: '进行中' },
  { id: 'done', title: '已完成' }
]

function TaskBoard({ tasks, onAddTaskClick, onUpdateStatus, onDeleteTask }) {
  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status)
  }

  return (
    <div className="board">
      {COLUMNS.map(column => (
        <Column 
          key={column.id}
          columnId={column.id}
          title={column.title}
          tasks={getTasksByStatus(column.id)}
          onAddTaskClick={onAddTaskClick}
          onUpdateStatus={onUpdateStatus}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  )
}

export default TaskBoard