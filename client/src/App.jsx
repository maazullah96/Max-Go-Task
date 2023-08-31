import { Outlet } from 'react-router-dom'
// import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Container from 'react-bootstrap/Container'
function App() {
  return (
    <>
      <Header />
      <main className='py-4'>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  )
}

export default App
