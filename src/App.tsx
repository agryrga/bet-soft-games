import { Routes, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import './index.scss'
export const App = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
  </Routes>
)
