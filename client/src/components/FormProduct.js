import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { yupProductInput } from '../utils/yupSchemas'
import { ALL_PRODUCTS, MODIFY_PRODUCT, ADD_PRODUCT } from '../utils/graphql'

function FormProduct ({ mode, showForm, setShowForm, currentProduct }) {
  const [modifyProduct] = useMutation(MODIFY_PRODUCT, {
    update (cache, { data: { modifyProduct } }) {
      if (modifyProduct && modifyProduct.id) {
        const { allProducts } = cache.readQuery({ query: ALL_PRODUCTS })
        const index = allProducts.map(product => product.id).indexOf(modifyProduct.id)
        if (index >= 0) { allProducts[index] = modifyProduct }
        cache.writeQuery({
          query: ALL_PRODUCTS,
          data: { allProducts: allProducts }
        })
      }
    }
  })
  const [addProduct] = useMutation(ADD_PRODUCT, {
    update (cache, { data: { addProduct } }) {
      if (addProduct && addProduct.id) {
        const { allProducts } = cache.readQuery({ query: ALL_PRODUCTS })
        cache.writeQuery({
          query: ALL_PRODUCTS,
          data: { allProducts: [addProduct, ...allProducts] }
        })
      }
    }
  })
  const formik = useFormik({
    initialValues: {
      name: mode === 'ADD' ? '' : currentProduct.name,
      price: mode === 'ADD' ? 0 : currentProduct.price,
      type: mode === 'ADD' ? '' : currentProduct.type,
      stock: mode === 'ADD' ? 0 : currentProduct.stock,
      enabled: mode === 'ADD' ? false : currentProduct.enabled,
      url: mode === 'ADD' ? '' : currentProduct.url
    },
    validationSchema: yupProductInput,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (mode === 'MODIFY') {
        modifyProduct({ variables: { id: currentProduct.id, input: values } })
      } else if (mode === 'ADD') {
        addProduct({ variables: { input: values } })
      }
      setShowForm(false)
    }
  })
  return (
    <Modal show={showForm} onHide={() => setShowForm(false)}>
      <Modal.Header className='bg-danger' closeButton></Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name='name' type='text' placeholder='Name'
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className='errorForm'>{formik.errors.name}</p>
            ) : null}
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              name='price' type='number' placeholder='Price'
              {...formik.getFieldProps('price')}
            />
            {formik.touched.price && formik.errors.price ? (
              <p className='errorForm'>{formik.errors.price}</p>
            ) : null}
          </Form.Group>
          <Form.Group controlId='type'>
            <Form.Label>Type</Form.Label>
            <Form.Control
              name='type' type='text' placeholder='Type'
              {...formik.getFieldProps('type')}
            />
            {formik.touched.type && formik.errors.type ? (
              <p className='errorForm'>{formik.errors.type}</p>
            ) : null}
          </Form.Group>
          <Form.Group controlId='stock'>
            <Form.Label>Stock</Form.Label>
            <Form.Control
              name='stock' type='number' placeholder='Stock'
              {...formik.getFieldProps('stock')}
            />
            {formik.touched.stock && formik.errors.stock ? (
              <p className='errorForm'>{formik.errors.stock}</p>
            ) : null}
          </Form.Group>
          <Form.Group controlId='enabled'>
            <Form.Label>Enabled</Form.Label>
            <Form.Check
              name='enabled'
              type='checkbox'
              value='enabled'
              checked={formik.values.enabled}
              onChange={formik.handleChange}
            />
            <p className='errorForm'>{formik.errors.enabled}</p>
          </Form.Group>
          <Form.Group controlId='url'>
            <Form.Label>Url Image</Form.Label>
            <Form.Control
              name='url' type='text' placeholder='Url Image'
              {...formik.getFieldProps('url')}
            />
            {formik.touched.url && formik.errors.url ? (
              <p className='errorForm'>{formik.errors.url}</p>
            ) : null}
          </Form.Group>
          <Button variant='danger' className='float-right' type='submit'>Done</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default FormProduct
