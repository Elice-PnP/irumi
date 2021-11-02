import React, { useState } from "react";
import styled from "styled-components";
import PropType from "prop-types";

function TodoCard({ object, done }) {
  const [checked, setChecked] = useState(done);

  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <CardWrapper>
      <ObjectWrapper>{object}</ObjectWrapper>
      <CheckBoxWrapper>
        <input type="checkbox" defaultChecked={done} onChange={handleCheck} />
      </CheckBoxWrapper>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  border-radius: 10px;
  background: #ddd;
  padding: 15px;
  display: flex;
`;

const ObjectWrapper = styled.div`
  display: flex;
  padding-left: 20px;
  font-size: 1.2rem;
  align-items: center;
  flex: 5;
`;

const CheckBoxWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  > input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }
`;

TodoCard.propTypes = {
  object: PropType.string,
  done: PropType.bool,
};

export default TodoCard;
