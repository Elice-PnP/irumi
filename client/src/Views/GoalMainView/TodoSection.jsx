import React, { useImperativeHandle, useState } from "react";
import styled from "styled-components";
import { PlusCircleOutline } from "@styled-icons/evaicons-outline";
import TodoCard from "./TodoCard";

function TodoSection() {
  const [taskList, setTastList] = useState([
    { title: "우유사기", done: true },
    { title: "테스트 보기", done: false },
  ]);

  const [mockNum, setMockNum] = useState(1);

  const handleNewTask = () => {
    setTastList([
      ...taskList,
      { title: "새로운 할 일 " + mockNum, done: false },
    ]);
    setMockNum(mockNum + 1);
  };

  return (
    <TodoWrapper>
      <Header>
        <span>오늘의 할 일</span> <Plus size="25" onClick={handleNewTask} />
      </Header>
      <TaskContainer>
        {taskList.map((task) => (
          <TodoCard key={task} object={task.title} done={task.done} />
        ))}
      </TaskContainer>
    </TodoWrapper>
  );
}

const TodoWrapper = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  gap: 10px;
`;

const Plus = styled(PlusCircleOutline)`
  cursor: pointer;
  :hover {
    color: #777;
  }
`;

const TaskContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 80px;
`;

export default TodoSection;
