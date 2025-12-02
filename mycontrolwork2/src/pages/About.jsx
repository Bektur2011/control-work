import Aboutimg from '../images/about.jpg'

export default function About() {
  return (
     <div style={{ padding: '80px 0', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif' }}>
      <div className='container'>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          marginBottom: '120px'
        }}>
          <div>
            <p style={{
              fontSize: '20px',
              lineHeight: '1.6',
              color: '#374151',
              marginBottom: '32px'
            }}>
              Наше приложение помогает организовать задачи, следить за прогрессом и достигать целей каждый день — легко, удобно и без лишнего хаоса.
            </p>
            <button style={{
              padding: '16px 32px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '9999px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(37,99,235,0.3)',
              transition: 'all 0.3s'
            }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#2563eb'}  
            >
              перейти к задачам
            </button>
          </div>

          <div style={{ textAlign: 'right' }}>
            <img
              src={Aboutimg}
              alt="О приложении"
              style={{maxWidth: '100%',height: 'auto',
              }}
            />
          </div>
        </div>


        <div>
          <h2 style={{
            fontSize: '40px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#0475FF',
            marginBottom: '16px'
          }}>
            Наши ценности
          </h2>
          <p style={{ textAlign: 'center', maxWidth: '800px',margin: '0 auto 64px'
          }}>
            Коротко и ясно о том, что делает наше приложение удобным, полезным и незаменимым для вашего ежедневного планирования.
          </p>

          <div style={{display: 'grid',gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',gap: '48px'
          }}>
            {[
              { num: "01.", title: "Просто и эффективно", text: "Наше приложение объединяет удобство и мощный функционал: создавайте задачи, устанавливайте напоминания и управляйте своим временем." },
              { num: "02.", title: "Умный трекинг", text: "Система отслеживания помогает видеть прогресс, контролировать привычки и структурировать день в одном месте." },
              { num: "03.", title: "Современный дизайн", text: "Интерфейс, который идеально смотрится и работает на любом устройстве — понятно, аккуратно и приятно для глаз." },
              { num: "04.", title: "Персональные настройки", text: "Гибкие категории, напоминания и приоритеты — настройте приложение так, как удобно именно вам." }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '56px', fontWeight: 'bold' }}>{item.num}</div>
                <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '12px 0' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', lineHeight: '1.6' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
