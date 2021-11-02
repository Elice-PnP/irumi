import React from "react";
import styled from "styled-components";
import GoalCard from "./GoalCard";

function Goal() {
  return (
    <GoalWrapper>
      <SectionWrapper>
        <div className="header">오늘</div>
        <TaskContainer>
          <GoalCard progress={40} goal={40} object={"운동하기"} type={"분"} />
        </TaskContainer>
      </SectionWrapper>
      <hr />
      <SectionWrapper>
        <div className="header">이번 주</div>
        <TaskContainer>
          <GoalCard progress={50} goal={100} object={"책읽기"} type={"분"} />
        </TaskContainer>
      </SectionWrapper>
      <hr />
      <SectionWrapper>
        <div className="header">이번 달</div>
        <TaskContainer>
          <GoalCard
            progress={1}
            goal={5}
            object={"부모님께 안부전화"}
            type={"회"}
          />
        </TaskContainer>
      </SectionWrapper>
    </GoalWrapper>
  );
}

const GoalWrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const SectionWrapper = styled.div`
  padding: 10px;
`;
const TaskContainer = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  gap: 10px;
`;

export default Goal;
