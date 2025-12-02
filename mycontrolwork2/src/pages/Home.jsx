import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const schema = yup.object({
  title: yup
    .string()
    .required('Название задачи обязательно')
    .min(3, 'Минимум 3 символа'),
  text: yup
    .string()
    .required('Описание обязательно')
    .min(5, 'Минимум 5 символов'),
}).required()

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [status, setStatus] = useState('Normal') 
  const [editingTask, setEditingTask] = useState(null) 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      text: '',
    },
  })

  const fetchTasks = () => {
    axios
      .get('http://localhost:5000/tasks')
      .then(({ data }) => setTasks(data))
      .catch((e) => {
        console.log(e)
        toast.error('Не удалось загрузить задачи')
      })
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      status, 
    }

    try {
      if (editingTask) {
        await axios.put(`http://localhost:5000/tasks/${editingTask.id}`, payload)
        toast.success('Задача обновлена')
      } else {
        await axios.post('http://localhost:5000/tasks', payload)
        toast.success('Задача создана')
      }

      fetchTasks()
      reset()
      setStatus('Normal')
      setEditingTask(null)
    } catch (error) {
      console.log(error)
      toast.error('Ошибка при сохранении задачи')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить эту задачу?')) return

    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`)
      toast.success('Задача удалена')
      fetchTasks()
    } catch (error) {
      console.log(error)
      toast.error('Ошибка при удалении задачи')
    }
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    reset({
      title: task.title,
      text: task.text,
    })
    setStatus(task.status || 'Normal')
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
    reset({
      title: '',
      text: '',
    })
    setStatus('Normal')
  }

  const priorityButtonStyle = (value) => ({
    backgroundColor: status === value ? '#0475FF' : 'transparent',
    color: status === value ? '#fff' : '#000',
    borderRadius: '20px',
    padding: '4px 16px',
    border: '1px solid #0475FF',
    cursor: 'pointer',
  })

  return (
    <div className='container'>
      <ToastContainer />

      <h1 style={{ color: '#0475FF' }}>Задачи</h1>
      <h2 style={{ color: '#0475FF', margin: '56px 0' }}>Список задач</h2>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '46px',
          marginBottom: '40px',
        }}
      >
        {tasks.map((task, indx) => (
          <div
            key={task.id}
            style={{
              padding: '15px',
              border: '1px solid black',
              borderRadius: '30px',
            }}
          >
            <p style={{ display: 'flex', justifyContent: 'end' }}>
              {task.status === 'High' ? (
                <span
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '4px 24px',
                    borderRadius: '30px',
                  }}
                >
                  {task.status}
                </span>
              ) : task.status === 'Middle' ? (
                <span
                  style={{
                    backgroundColor: 'orange',
                    color: 'white',
                    padding: '4px 24px',
                    borderRadius: '30px',
                  }}
                >
                  {task.status}
                </span>
              ) : (
                <span
                  style={{
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '4px 24px',
                    borderRadius: '30px',
                  }}
                >
                  {task.status || 'Normal'}
                </span>
              )}
            </p>
            <h2 style={{ marginBottom: '10px' }}>
              №{indx + 1} {task.title}
            </h2>
            <p style={{ marginBottom: '46px' }}>
              {task.text.length > 40 ? `${task.text.slice(0, 40)}...` : task.text}
            </p>
            <div
              style={{
                padding: '0 30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '7px',
              }}
            >
              <Link style={{ width: '100%' }} to={`/detail/${task.id}`}>
                <button
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    padding: '5px 0',
                    borderRadius: '30px',
                    cursor: 'pointer',
                  }}
                >
                  Открыть
                </button>
              </Link>
              <button
                style={{
                  backgroundColor: 'transparent',
                  padding: '5px 0',
                  borderRadius: '30px',
                  cursor: 'pointer',
                }}
                onClick={() => handleEdit(task)}
              >
                Изменить
              </button>
              <button
                style={{
                  backgroundColor: 'transparent',
                  padding: '5px 0',
                  borderRadius: '30px',
                  cursor: 'pointer',
                }}
                onClick={() => handleDelete(task.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3>{editingTask ? 'Редактировать задачу' : 'Создать задачу'}</h3>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label>Название задачи</label>
          <input type='text' {...register('title')} />
          {errors.title && (
            <span style={{ color: 'red', fontSize: '12px' }}>{errors.title.message}</span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label>Описание</label>
          <input type='text' {...register('text')} />
          {errors.text && (
            <span style={{ color: 'red', fontSize: '12px' }}>{errors.text.message}</span>
          )}
        </div>

        <div>
          <p style={{ marginBottom: '8px' }}>Приоритет</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type='button'
              style={priorityButtonStyle('Normal')}
              onClick={() => setStatus('Normal')}
            >
              Normal
            </button>
            <button
              type='button'
              style={priorityButtonStyle('Middle')}
              onClick={() => setStatus('Middle')}
            >
              Middle
            </button>
            <button
              type='button'
              style={priorityButtonStyle('High')}
              onClick={() => setStatus('High')}
            >
              High
            </button>
          </div>
        </div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', gap: '8px', marginTop: '12px' }}>
          <button
            type='submit'
            disabled={isSubmitting}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: '#0475FF',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            {editingTask ? 'Сохранить изменения' : 'Создать задачу'}
          </button>

          {editingTask && (
            <button
              type='button'
              onClick={handleCancelEdit}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: '1px solid #aaa',
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
            >
              Отмена
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
