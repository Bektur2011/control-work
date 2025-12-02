import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import About from './pages/About';
import Detail from './pages/Detail';

function App() {
  return (
    <BrowserRouter>
      <header className='container' style={{
        display: 'flex', 
        justifyContent: 'center', 
        gap: '70px', 
        margin: '54px auto'
        }}>
        <Link to={'/'}>
          Task meneger
        </Link>
        <Link to={'/about'}>
          О приложении
        </Link>
      </header>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/detail/:id' element={<Detail />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
