import { FunctionComponent } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export const Navigation: FunctionComponent = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">Application</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="users">Users</Nav.Link>
            <Nav.Link href="roles">Roles</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
