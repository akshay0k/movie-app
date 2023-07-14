import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/index.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Moviereview from './components/Moviereview.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/moviereview/:id' element={<Moviereview/>}/>
      {/* <Route path='/moviereviews/:id' element={<Moviereview/>}/> */}
    </Routes>
    
    </BrowserRouter>
  </React.StrictMode>,
)
