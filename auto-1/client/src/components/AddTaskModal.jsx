import { useState } from 'react'

function AddTaskModal({ onAddTask, onClose }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTask(title.trim(), description.trim())
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">新增任务</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">标题 *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">描述</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              取消
            </button>
            <button type="submit" className="btn btn-submit" disabled={!title.trim()}>
              添加
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTaskModal