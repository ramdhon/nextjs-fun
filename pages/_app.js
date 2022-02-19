import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Container, Nav, NavDropdown, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import AppContext from '../context'
import PopUp from '../components/popup'

const { Provider } = AppContext

const Constant = {
  LIGHT: 'light',
  DARK: 'dark',
  PROGRESS: 'in progress',
  DONE: 'done',
  RESETPOPUP: {
    show: false,
    cancelable: false,
    closeable: false,
    title: '',
    body: '',
    confirm: '',
    resolve: null,
    reject: null
  }
}

function MyApp({ Component, pageProps }) {
  // STATE HOOKS
  const [theme, setTheme] = useState(Constant.LIGHT);
  const [popup, setPopup] = useState(Constant.RESETPOPUP)
  
  // COMPUTED
  const isDark = () => theme === Constant.DARK
  const darkModeForm = () => isDark() ? "text-white" : "text-black"
  const darkModeBg = () => isDark() ? 'bg-secondary text-white' : ''
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
  
  // POPUP
  const POPUP = {
    '$confirm'(
    title = 'Info',
    body = 'Are you sure?', 
    {
      cancelable = true,
      closeable = true,
      confirm = 'Confirm'
    } = {}) {
      return new Promise((resolve, reject) => {
        setPopup({
          ...popup,
          show: true,
          title,
          body,
          cancelable,
          closeable,
          confirm,
          resolve,
          reject
        })
      })
    }
  }

  // API METHODS
  const api = {
    async ADD_TODO(todo) {
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
        localStorage.removeItem('todo-memory')
        return
      }
    },
    async GET_TODO () {
      let todoList = localStorage.getItem('todo-memory', )
      if (!todoList) {
        todoList = '[]'
      }
      try {
        return JSON.parse(todoList)
      } catch (err) {
        localStorage.removeItem('todo-memory')
        return []
      }
    },
    async REMOVE_ALL_TODO() {
      localStorage.removeItem('todo-memory')
      return
    },
    async DELETE_TODO(index) {
      let todoList = localStorage.getItem('todo-memory', )
      if (!todoList) {
        return
      }
      try {
        todoList = JSON.parse(todoList)
        todoList.splice(index, 1)
        todoList = JSON.stringify(todoList)
        localStorage.setItem('todo-memory', todoList)
        return index
      } catch (err) {
        localStorage.removeItem('todo-memory')
        return
      }
    },
    async EDIT_TODO(updatedTodo, index) {
      let todoList = localStorage.getItem('todo-memory', )
      if (!todoList) {
        return
      }
      try {
        todoList = JSON.parse(todoList) 
        todoList.splice(index, 1)
        todoList = [updatedTodo, ...todoList]
        todoList = JSON.stringify(todoList)
        localStorage.setItem('todo-memory', todoList)
        return updatedTodo
      } catch (err) {
        localStorage.removeItem('todo-memory')
        return
      }
    }
  }
  
  // CONTEXT
  const context = {
    state: {
      Constant,
      theme,
      popup,
    },
    api,
    POPUP,
    setTheme,
    setPopup,
    isDark,
    delay,
    darkModeBg
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
            <Form className={darkModeForm()}>
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
      <PopUp />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
