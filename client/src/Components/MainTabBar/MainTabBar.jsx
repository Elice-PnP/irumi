import styled from "styled-components";
import PropTypes from "prop-types";
import { Tab } from "bootstrap";

export default function MainTabBar({ currentTab }) {
  const buttons = ["목표", "노트", "그룹"];

  return (
    <BarContainer>
      <StyledButtonGroup>
        {buttons.map((tab, index) => (
          <TabButton
            key={tab}
            className={currentTab === index ? "isSelected" : ""}
          >
            {tab}
          </TabButton>
        ))}
      </StyledButtonGroup>
    </BarContainer>
  );
}

MainTabBar.propTypes = {
  currentTab: PropTypes.number,
};

const BarContainer = styled.div`
  position: absolute;
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
