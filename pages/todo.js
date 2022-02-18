import { Container, Row, Form, Button, Table } from "react-bootstrap";
import TodoTitle from '../components/Todo/title'
import TodoForm from '../components/Todo/form'
import { useState } from "react";

const Constant = {
  PROGRESS: 'in progress',
  DONE: 'done'
}

export default function Todo() {
  const [taskList, setTaskList] = useState([])
  // METHODS
  const addToTaskList = (input) => {
    setTaskList([
      {
        task: input,
        status: Constant.PROGRESS
      },
      ...taskList,
    ])
  }

  return (
    <Container>
      <div className="my-5"></div>
      <div className="pt-3"></div>

      <Row>
        <TodoTitle />
      </Row>
      <Row>
        <TodoForm addToTaskList={addToTaskList} />
      </Row>
      <Row className="mt-5">
        <Table striped hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Tasks</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              taskList.length > 0
              ?
              taskList.map((item, index) => (
                <tr key={`item-${index}`}>
                  <td>{index + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.status}</td>
                </tr>
              ))
              :
              <tr>
                <td colSpan={3}>No task yet.</td>
              </tr>
            }
          </tbody>
        </Table>
      </Row>
    </Container>
  )
}