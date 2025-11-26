import { useState } from 'react'
import Todolist from './Todolist'
import Something from './Something'

export default function Header() {
  const [activeTab, setActiveTab] = useState('tasks')

  return (
    <div className="header-wrapper">
      <div className="header-nav">
        <button 
          className={`nav-button ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          Task Manager
        </button>
        <button 
          className={`nav-button ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          О приложении
        </button>
      </div>

      <div className="content">
        {activeTab === 'tasks' && <Todolist />}
        {activeTab === 'about' && <Something setActiveTab={setActiveTab} />}
      </div>
    </div>
  )
}
