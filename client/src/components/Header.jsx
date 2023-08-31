import Container from 'react-bootstrap/Container'
// import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <Navbar bg='dark' data-bs-theme='dark'>
      <Container>
        <Navbar.Brand href='/'>
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            Home
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
export default Header
