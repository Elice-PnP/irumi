import styled from "styled-components";
import TopBar from "./TopBar/TopBar";
import MainTabBar from "./MainTabBar/MainTabBar";
import PropTypes from "prop-types";

const CommonPageLayout = ({ children, currentTab, navLinks }) => {
  return (
    <Container>
      <header>
        <TopBar navLinks={navLinks} />
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
  navLinks: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string,
      route: PropTypes.string,
    })
  ),
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

export default CommonPageLayout;
