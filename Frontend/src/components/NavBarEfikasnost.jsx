import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RoutesNames } from '../constans';




export default function NavBarEfikasnost() {

  const navigate = useNavigate();
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Efikasnost APP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate(RoutesNames.HOME)}>Početna</Nav.Link>
              <Nav.Link href="https://efikasnostprijevoza.site/swagger/index.html" target='_blank'>Swagger</Nav.Link>
              <NavDropdown title="Programi" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate(RoutesNames.VOZAC_PREGLED)}>Vozaci</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate(RoutesNames.KAMION_PREGLED)}>Kamioni</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate(RoutesNames.CIKLICNA_PREGLED)}>Ciklicna</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate(RoutesNames.TURA_PREGLED)}>Ture</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>


  );
}