import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { LOGOUT, ME } from '../utils/graphql'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function Nav ({ setMode, setShowForm }) {
  const history = useHistory()
  const [user, setUser] = useState('')
  const { data } = useQuery(ME, {
    onCompleted (data) {
      if (data.me) setUser(data.me.firstName + ' ' + data.me.lastName)
    },
    fetchPolicy: 'no-cache'
  })

  const [logout] = useMutation(
    LOGOUT, {
      onCompleted (data) {
        if (data.logout) {
          history.push('/auth/login')
        }
      }
    })
  const handleAdd = () => {
    setShowForm(true)
    setMode('ADD')
  }
  return (
    <Navbar bg='light' className='raleway'>
      <Navbar.Brand>Admin Dashboard</Navbar.Brand>
      <Button variant='danger' onClick={handleAdd}><FontAwesomeIcon icon={faPlus} /></Button>
      <Navbar.Collapse className='justify-content-end'>
        <Navbar.Text>
          Hello <span className='font-weight-bold'>{user}</span>.
        </Navbar.Text>
        <Button onClick={logout} className='ml-3' variant='danger'><FontAwesomeIcon icon={faPowerOff} /></Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Nav
