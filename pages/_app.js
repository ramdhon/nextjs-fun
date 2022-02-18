import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Container, Nav, NavDropdown, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import AppContext from '../context'

const { Provider } = AppContext

const Constant = {
  LIGHT: 'light',
  DARK: 'dark'
}

function MyApp({ Component, pageProps }) {
  // STATE HOOKS
  const [theme, setTheme] = useState(Constant.LIGHT);
  
  // COMPUTED
  const isDark = () => theme === Constant.DARK
  const darkMode = () => isDark() ? "text-white" : "text-black"
  // METHODS
  const changeTheme = (e) => {
    if (e.target.checked === true) {
      setTheme(Constant.DARK)
      localStorage.setItem('darkMode', true);
    } else {
      setTheme(Constant.LIGHT)
      localStorage.removeItem('darkMode');
    }
  }
  const checkDarkMode = () => {
    const darkMode = localStorage.getItem('darkMode');
    if (!darkMode) {
      setTheme(Constant.LIGHT)
    } else {
      setTheme(Constant.DARK)
    }
  }
  const delay = async (ms) => {
    return new Promise (resolve => {
      setTimeout(() => {
        resolve()
      }, ms)
    })
  }

  // API methods
  const ADD_TODO = async (todo) => {
    let todoList = localStorage.getItem('todo-memory', )
    if (!todoList) {
      todoList = '[]'
    }
    try {
      todoList = JSON.parse(todoList)
      todoList = [todo, ...todoList]
      todoList = JSON.stringify(todoList)
      localStorage.setItem('todo-memory', todoList)
      return todo
    } catch (err) {
      return
    }
  }
  const GET_TODO = async () => {
    let todoList = localStorage.getItem('todo-memory', )
    if (!todoList) {
      todoList = '[]'
    }
    try {
      return JSON.parse(todoList)
    } catch (err) {
      return []
    }
  }

  // CONTEXT
  const context = {
    state: {
      Constant,
      theme
    },
    api: {
      ADD_TODO,
      GET_TODO
    },
    setTheme,
    isDark,
    delay,
  }

  // LIFECYCLE HOOKS
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
    checkDarkMode()
  }, [])

  return (
    <Provider value={context}>
      <Navbar fixed="top" bg={theme} variant={theme} expand="lg">
        <Container>
          <Navbar.Brand href="/">My Next Fun</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/todo">Todo</Nav.Link>
              <NavDropdown title="Dropdown" id="app-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className={darkMode()}>
              <Form.Check
                checked={isDark()}
                onChange={changeTheme}
                type="switch"
                id="dark-mode"
                label="Dark mode"
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
