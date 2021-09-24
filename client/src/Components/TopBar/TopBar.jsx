import React, {useState} from "react";
import styled from "styled-components";

import Navigation from "./Navigation";

export default function TopBar() {
  const [user, setUser] = useState(1);

  return (
    <Container>
      <Contents>
        <div>
          햄버거
          {/* <img className="hamburger" alt="hamburger" src="hamburger.png" /> */}
        </div>
        {user ? <Navigation /> : <></> }
      </Contents>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: #dde0ea;
`

const Contents = styled.div`
  display: flex;
  width: 96%;
  max-width: 3000px;
  height: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`

