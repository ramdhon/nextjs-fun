import { Container, Row, Table } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import TodoTitle from '../components/Todo/title'
import TodoForm from '../components/Todo/form'
import AppContext from '../context'

const Constant = {
  PROGRESS: 'in progress',
  DONE: 'done'
}

export default function Todo() {
  const { api: { ADD_TODO, GET_TODO } } = useContext(AppContext)
  const [taskList, setTaskList] = useState([])

  // METHODS
  const addToTaskList = (input) => {
    const todo = {
      task: input,
      status: Constant.PROGRESS
    }
    ADD_TODO(todo)
      .then(result => {
        if (!result) {
          return
        }
        setTaskList([
          result,
          ...taskList
        ])
      })
  }
  const getTaskList = () => {
    GET_TODO()
      .then(result => {
        setTaskList(result)
      })
  }

  useEffect(() => {
    getTaskList()
  }, [])

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