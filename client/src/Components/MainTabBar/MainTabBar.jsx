import styled from "styled-components";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

export default function MainTabBar() {
  return (
    <BarContainer>
      <StyledButtonGroup size="lg" aria-label="Basic example">
        <TabButton variant="secondary">목표</TabButton>
        <TabButton variant="secondary">노트</TabButton>
        <TabButton variant="secondary">그룹</TabButton>
      </StyledButtonGroup>
    </BarContainer>
  );
}

const BarContainer = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  width: 100%;
  background-color: yellow;
`;

const TabButton = styled(Button)`
  border-radius: 0px;
`;
