import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Products from '../components/Products'
import Footer from '../components/Footer'
import { Container } from 'react-bootstrap'
import FormProduct from '../components/FormProduct'
function App () {
  const [showForm, setShowForm] = useState(false)
  const [mode, setMode] = useState('ADD')
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    price: '',
    type: '',
    stock: '',
    enabled: true,
    url: ''
  })
  useEffect(() => {
    document.body.style.backgroundColor = '#E2E2E2'
    return () => {
      document.body.style.backgroundColor = 'black'
    }
  }, [])
  return (
    <Container fluid className='p-0'>
      <FormProduct mode={mode} currentProduct={currentProduct} showForm={showForm} setShowForm={setShowForm} />
      <Nav setMode={setMode} setShowForm={setShowForm} />
      <Products setMode={setMode} setCurrentProduct={setCurrentProduct} setShowForm={setShowForm} />
      <Footer />
    </Container>
  )
}

export default App
