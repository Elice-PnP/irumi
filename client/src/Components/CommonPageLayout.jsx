import styled from "styled-components";
import TopBar from "./TopBar/TopBar";
import MainTabBar from "./MainTabBar/MainTabBar";
import PropTypes from "prop-types";

const CommonPageLayout = ({ children, currentTab, NavButtons }) => {
  return (
    <Container>
      <header>
        <TopBar />
      </header>
      <main>{children}</main>
      <footer>
        {currentTab >= 0 && <MainTabBar currentTab={currentTab} />}
      </footer>
    </Container>
  );
};

CommonPageLayout.defaultProps = {
  currentTab: -1,
};

CommonPageLayout.propTypes = {
  children: PropTypes.any,
  currentTab: PropTypes.number,
  NavButtons: PropTypes.arrayOf(PropTypes.element),
};

const Container = styled.div`
  background-color: #ffff;
  height: 100vh;
  width: 100%;
`;

export default CommonPageLayout;
