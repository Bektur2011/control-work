import { useState } from 'react'

export default function Additingform({ onAddTask }) {
  const [formData, setFormData] = useState({ title: '', desc: '', priority: '' })

  const handleAddTask = () => {
    if (formData.title && formData.desc && formData.priority) {
      onAddTask({
        title: formData.title,
        desc: formData.desc,
        priority: formData.priority,
        completed: false
      })
      setFormData({ title: '', desc: '', priority: '' })
    }
  }

  return (
    <div className="add-form">
      <h3>Форма добавления</h3>
      <div className="form-row">
        <input 
          type="text" 
          placeholder="Название"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
        <input 
          type="text" 
          placeholder="Описание"
          value={formData.desc}
          onChange={(e) => setFormData({...formData, desc: e.target.value})}
        />
        <div className="priority-group">
          <span className="priority-label">Приоритет:</span>
          <div className="priority-pills">
            <button
              className={`pill normal ${formData.priority === 'normal' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, priority: 'normal'})}
            >
              Низкий
            </button>
            <button
              className={`pill medium ${formData.priority === 'medium' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, priority: 'medium'})}
            >
              Средний
            </button>
            <button
              className={`pill high ${formData.priority === 'high' ? 'active' : ''}`}
              onClick={() => setFormData({...formData, priority: 'high'})}
            >
              Высокий
            </button>
          </div>
        </div>
      </div>
      <p className="required-note">*Все поля обязательны для заполнения</p>
      <button className="btn-primary" onClick={handleAddTask}>Создать задачу</button>
    </div>
  )
}