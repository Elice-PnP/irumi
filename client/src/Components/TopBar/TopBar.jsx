import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import PropTypes from "prop-types";

export default function TopBar({ NavButtons }) {
  return (
    <Navbar bg="dark" variant="dark" expand={false}>
      <LeftDiv>
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
      </LeftDiv>
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
  NavButtons: PropTypes.arrayOf(PropTypes.element),
};

const LeftDiv = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 10px;
`;
