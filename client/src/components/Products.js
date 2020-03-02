import React from 'react'
import Fade from 'react-reveal/Fade'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ALL_PRODUCTS, REMOVE_PRODUCT } from '../utils/graphql'
import { Container, Card, Button, Row, Badge, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

function Products ({ setMode, setShowForm, setCurrentProduct }) {
  const { loading, error, data } = useQuery(ALL_PRODUCTS)
  const [removeProduct] = useMutation(REMOVE_PRODUCT, {
    update (cache, { data: { removeProduct } }) {
      if (removeProduct.id) {
        const { allProducts } = cache.readQuery({ query: ALL_PRODUCTS })
        const index = allProducts.map(product => product.id).indexOf(removeProduct.id)
        index >= 0 && allProducts.splice(index, 1)
        cache.writeQuery({
          query: ALL_PRODUCTS,
          data: { allProducts: allProducts }
        })
      }
    }
  })
  if (loading) return <div className='text-center'><Spinner animation='border' variant='danger' /></div>
  if (error) return `Error! ${error.message}`
  const handleModify = (product) => {
    setMode('MODIFY')
    setCurrentProduct(product)
    setShowForm(true)
  }
  const items = data && data.allProducts.map((product) =>
    <Card key={product.id} style={{ width: '16rem' }} className={product.enabled ? 'm-2' : 'm-2 disabled'}>
      <Card.Img variant='top' src={product.url} />
      <Card.Body className='raleway'>
        <Card.Title style={{ fontSize: '1rem' }}>
          <span>{product.name}</span>
          <span className='ml-5 font-weight-bold'>{product.price}$</span>
        </Card.Title>
        <Card.Text className='font-italic'>{product.type}</Card.Text>
        <Card.Text>Stock: <Badge variant={product.stock === 0 ? 'danger' : 'success'}>{product.stock}</Badge></Card.Text>
        <Button variant='dark' onClick={() => handleModify(product)} className='mr-2'><FontAwesomeIcon icon={faPencilAlt} /></Button>
        <Button variant='danger' onClick={() => removeProduct({ variables: { id: product.id } })}><FontAwesomeIcon icon={faTrashAlt} /></Button>
      </Card.Body>
    </Card>
  )

  return (
    <Fade>
      <Container className='mt-2 midScroll'>
        <Row className='d-flex justify-content-center'>
          {items}
        </Row>
      </Container>
    </Fade>
  )
}

export default Products
