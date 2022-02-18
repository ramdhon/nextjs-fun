import { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import AppContext from '../../context'

export default function TodoForm({ addToTaskList, clearTaskList }) {
  const { POPUP, api: { REMOVE_ALL_TODO } } = useContext(AppContext)
  const [task, setTask] = useState('')

  // METHODS
  const addTask = (e) => {
    e.preventDefault()
    addToTaskList(task)
    setTask('')
  }
  const handleTextChange = (e) => {
    setTask(e.target.value)
  }
  const handleRemoveAll = () => {
    POPUP.$confirm('Info', 'Are you sure to remove all your todo?')
      .then(() => {
        return REMOVE_ALL_TODO()
      })
      .then(() => {
        clearTaskList()
      })
      .catch((err) => {
        if (!err) {
          return
        }
        alert(err.message)
      })
  }

  return (
    <Form onSubmit={addTask}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your task</Form.Label>
        <Form.Control value={task} onChange={handleTextChange} type="text" placeholder="Write the task" />
      </Form.Group>

      <Button onClick={addTask} variant="primary" type="submit">
        Add
      </Button>
      <Button onClick={handleRemoveAll} className="ms-3" variant="danger">
        Remove All
      </Button>
    </Form>
  )
}