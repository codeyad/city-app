import { Routes, Route } from 'react-router-dom'
import FormComponent from './components/formComponent'
import HomeComponentPage from './components/pages/home'
import ResultComponentPage from './components/pages/result'
import './App.css'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomeComponentPage />} />
        <Route path='result' element={<ResultComponentPage />} />
      </Routes>
    </div>
  )
}

export default App
