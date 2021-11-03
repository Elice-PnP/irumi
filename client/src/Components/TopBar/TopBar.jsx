import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import PropTypes from "prop-types";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";

export default function TopBar({ navLinks }) {
  const linksToAdd =
    navLinks &&
    navLinks.map((navLink) => (
      <LinkContainer key={navLink.name} to={navLink.route}>
        <Button>{navLink.name}</Button>
      </LinkContainer>
    ));

  return (
    <Navbar bg="dark" variant="dark" expand={false}>
      <NavGroup>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          IRUMI
        </Navbar.Brand>
      </NavGroup>
      <NavGroup>{linksToAdd}</NavGroup>
      <Navbar.Offcanvas
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasNavbarLabel">사이드바</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="#action1">설정</Nav.Link>
            <Nav.Link href="#action2">로그아웃</Nav.Link>
            <Nav.Link href="#action2">About Irumi</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  );
}

TopBar.propTypes = {
  navLinks: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string,
      route: PropTypes.string,
    })
  ),
};

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 20px 0 20px;
`;
