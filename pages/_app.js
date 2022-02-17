import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import AppContext from '../context'

const { Provider } = AppContext

const Constant = {
  LIGHT: 'light',
  DARK: 'dark'
}
function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(Constant.LIGHT);
  const context = {
    state: {
      Constant,
      theme: 'light'
    },
    setTheme,
  }

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <Provider value={context}>
      <Navbar bg="light" expand="lg">
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
