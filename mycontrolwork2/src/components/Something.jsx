    import rectangle53 from '../assets/Rectangle 53.png';

export default function Something() {
  return (
    <>
      <div className="something-container">
        <div className="something-text">
          <p>Наше приложение помогает организовать задачи, следить за прогрессом и достигать целей каждый день — легко, удобно и без лишнего хаоса.</p>
          <button className="something-button">Перейти к задачам</button>
        </div>
        <div className="something-image-container">
          <img src={rectangle53} alt="Rectangle 53" className="something-image" />
        </div>
      </div>
      <div className="something-values">
        <h1>Наши ценности</h1>
        <p>Коротко и ясно о том, что делает наше приложение удобным, полезным и незаменимым для вашего ежедневного планирования.</p>
        <div className="values-examples">
          <div className="value-item">
            <h3>01. Просто и эффективно</h3>
            <p>Наше приложение объединяет удобство и мощный функционал: создавайте задачи, отмечайте выполненные и управляйте своим временем.</p>
          </div>
          <div className="value-item">
            <h3>02. Умный трекинг</h3>
            <p>Система отслеживания помогает видеть прогресс, контролировать привычки и структурировать день в одном месте.</p>
          </div>
          <div className="value-item">
            <h3>03. Современный дизайн</h3>
            <p>Интерфейс, который идеально смотрится и работает на любом устройстве — понятно, аккуратно и приятно для глаз.</p>
          </div>
          <div className="value-item">
            <h3>04. Персональные настройки</h3>
            <p>Гибкие категории, напоминания и приоритеты — настройте приложение так, как удобно именно вам.</p>
          </div>
        </div>
      </div>
    </>
  );
}
