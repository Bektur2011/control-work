import { useState } from 'react'
import Additingform from './Additingform'
import TaskDetail from './TaskDetail'

export default function Todolist() {
  const [filter, setFilter] = useState('Все')
  const [tasks, setTasks] = useState([])
  const [viewingTask, setViewingTask] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [showDetail, setShowDetail] = useState(false)

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }])
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleEditTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId)
    setEditingTask(task)
  }

  const handleSaveEdit = () => {
    if (editingTask && editingTask.title && editingTask.desc && editingTask.priority) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? editingTask : task
      ))
      setEditingTask(null)
    }
  }

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

  const truncateText = (text, maxLength = 75) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const handleOpenTask = (task) => {
    setViewingTask(task)
    setShowDetail(true)
  }

  const handleBackToList = () => {
    setShowDetail(false)
    setViewingTask(null)
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Все') return true
    if (filter === 'Активные') return !task.completed
    if (filter === 'Выполненные') return task.completed
    return true
  })

  if (showDetail && viewingTask) {
    return (
      <TaskDetail 
        task={viewingTask} 
        onBack={handleBackToList} 
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    )
  }

  return (
    <div className="todolist-container">
      <div className="tasks-header">
        <h3>Задачи</h3>
        <div className="filter-group">
          <label>Фильтры:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>Все</option>
            <option>Активные</option>
            <option>Выполненные</option>
          </select>
        </div>
      </div>

      <div className="task-list-header">
        <h4>Список задач ({filteredTasks.length})</h4>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty-note">Список задач пуст — добавьте новую задачу.</p>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map((task, idx) => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <span className="task-number">№{idx + 1}</span>
                <span className={`task-badge ${getPriorityColor(task.priority)}`}>
                  {getPriorityLabel(task.priority)}
                </span>
              </div>
              <div style={{ marginBottom: '8px' }}>
              </div>
              <h4>{truncateText(task.title, 50)}</h4>
              <p>{truncateText(task.desc, 75)}</p>
              <div className="task-buttons">
                <button 
                  className="btn-outline"
                  onClick={() => handleOpenTask(task)}
                >
                  Открыть
                </button>
                <button 
                  className="btn-outline"
                  onClick={() => handleEditTask(task.id)}
                >
                  Изменить
                </button>
                <button 
                  className="btn-outline"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingTask && (
        <div className="modal-overlay" onClick={() => setEditingTask(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Редактирование задачи</h3>
            <div className="modal-body">
              <input 
                type="text" 
                placeholder="Название"
                value={editingTask.title}
                onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <input 
                type="text" 
                placeholder="Описание"
                value={editingTask.desc}
                onChange={(e) => setEditingTask({...editingTask, desc: e.target.value})}
                style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <div className="priority-group" style={{ marginBottom: '10px' }}>
                <span className="priority-label">Приоритет:</span>
                <div className="priority-pills">
                  <button
                    className={`pill normal ${editingTask.priority === 'normal' ? 'active' : ''}`}
                    onClick={() => setEditingTask({...editingTask, priority: 'normal'})}
                  >
                    Низкий
                  </button>
                  <button
                    className={`pill medium ${editingTask.priority === 'medium' ? 'active' : ''}`}
                    onClick={() => setEditingTask({...editingTask, priority: 'medium'})}
                  >
                    Средний
                  </button>
                  <button
                    className={`pill high ${editingTask.priority === 'high' ? 'active' : ''}`}
                    onClick={() => setEditingTask({...editingTask, priority: 'high'})}
                  >
                    Высокий
                  </button>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button className="btn-primary" onClick={handleSaveEdit}>
                Сохранить
              </button>
              <button 
                className="btn-primary" 
                onClick={() => setEditingTask(null)}
                style={{ background: '#ccc' }}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      <Additingform onAddTask={handleAddTask} />
    </div>
  )
}