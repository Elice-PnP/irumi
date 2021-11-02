import React from "react";
import styled from "styled-components";
import Calendar from "./Calendar";
import Todo from "./Todo";
import Goal from "./Goal";

function GoalMainView() {
  return (
    <GoalMainWrapper>
      <Calendar />
      <Goal />
      <Todo />
    </GoalMainWrapper>
  );
}

const GoalMainWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default GoalMainView;
