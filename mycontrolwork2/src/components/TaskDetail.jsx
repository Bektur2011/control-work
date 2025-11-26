export default function TaskDetail({ task, onBack, onToggleComplete, onDelete, onEdit }) {
  const getPriorityLabel = (priority) => {
    const labels = { 
      normal: 'Низкий', 
      medium: 'Средний', 
      high: 'Высокий' 
    }
    return labels[priority] || priority
  }

  const getPriorityColor = (priority) => {
    const colors = { 
      normal: 'green', 
      medium: 'yellow', 
      high: 'red' 
    }
    return colors[priority] || 'green'
  }

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      onDelete(task.id)
      onBack()
    }
  }

  const handleEdit = () => {
    onEdit(task.id)
  }

  return (
    <div className="task-detail-page">
      <button className="link-back" onClick={onBack}>
        ← Назад
      </button>
      
      <div className="task-card-detail">
        <div className="task-card-header">
          <h2>№{task.id} {task.title}</h2>
          <span 
            className="status-badge active"
            onClick={() => onToggleComplete(task.id)}
            title="Нажмите для изменения статуса"
          >
            {task.completed ? 'Выполнено' : 'Активна'}
          </span>
        </div>
        
        <div className="task-card-body">
          <p>{task.desc}</p>
        </div>

        <div className="task-card-footer">
          <button className="icon-btn delete-btn" onClick={handleDelete} title="Удалить">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
            </svg>
          </button>
          <button className="icon-btn edit-btn" onClick={handleEdit} title="Редактировать">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}