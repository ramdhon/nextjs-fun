import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function TodoForm({ addToTaskList }) {
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

  return (
    <Form onSubmit={addTask}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your task</Form.Label>
        <Form.Control value={task} onChange={handleTextChange} type="text" placeholder="Write the task" />
      </Form.Group>

      <Button onClick={addTask} variant="primary" type="submit">
        Add
      </Button>
    </Form>
  )
}