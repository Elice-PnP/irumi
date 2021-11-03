import styled from "styled-components";
import PropTypes from "prop-types";
import { LinkContainer } from "react-router-bootstrap";

export default function MainTabBar({ currentTab }) {
  const buttons = [
    {
      name: "목표",
      route: "/goals",
    },
    {
      name: "노트",
      route: "/notes",
    },
    {
      name: "그룹",
      route: "/groups",
    },
  ];

  return (
    <BarContainer>
      <StyledButtonGroup>
        {buttons.map((tab, index) => (
          <LinkContainer key={tab.name} to={tab.route}>
            <TabButton className={currentTab === index ? "isSelected" : ""}>
              {tab.name}
            </TabButton>
          </LinkContainer>
        ))}
      </StyledButtonGroup>
    </BarContainer>
  );
}

MainTabBar.propTypes = {
  currentTab: PropTypes.number,
};

const BarContainer = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
`;

const StyledButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
`;

const TabButton = styled.button`
  width: auto;
  height: 80px;
  background-color: white;
  text-align: center;

  &.isSelected {
    background-color: darkgray;
  }
`;
