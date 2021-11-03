import React from "react";
import styled from "styled-components";
import CalendarSection from "./CalendarSection";
import TodoSection from "./TodoSection";
import GoalSection from "./GoalSection";
import CommonPageLayout from "../../Components/CommonPageLayout";

function GoalMainView() {
  return (
    <CommonPageLayout currentTab={0}>
      <GoalMainWrapper>
        <CalendarSection />
        <GoalSection />
        <TodoSection />
      </GoalMainWrapper>
    </CommonPageLayout>
  );
}

const GoalMainWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default GoalMainView;
