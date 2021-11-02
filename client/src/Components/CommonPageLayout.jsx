import styled from "styled-components";
import TopBar from "./TopBar/TopBar";
import MainTabBar from "./MainTabBar/MainTabBar";
import PropTypes from "prop-types";

const CommonPageLayout = ({ children }) => {
  return (
    <Container>
      <header>
        <TopBar />
      </header>
      <main>{children}</main>
      <footer>
        <MainTabBar />
      </footer>
    </Container>
  );
};

CommonPageLayout.propTypes = {
  children: PropTypes.element,
};

const Container = styled.div`
  background-color: pink;
  height: 100vh;
`;

const BarContainer = styled.div`
  position: fixed;
  bottom: 0px;
`;

export default CommonPageLayout;
