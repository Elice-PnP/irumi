import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  PlusCircleOutline,
  MinusCircleOutline,
} from "@styled-icons/evaicons-outline";

function GoalCard({ progress, goal, object, type }) {
  const [currentProgress, setCurrentProgress] = useState(progress);

  const handleClickPlus = () => {
    if (currentProgress + 1 <= goal) {
      setCurrentProgress(currentProgress + 1);
    }
  };

  const handleClickMinus = () => {
    if (currentProgress - 1 >= 0) {
      setCurrentProgress(currentProgress - 1);
    }
  };

  return (
    <CardWrapper>
      <ProgressWrapper>
        <div className="percentage">
          {Math.floor((currentProgress / goal) * 100)}%
        </div>
        <div className="progress">
          {currentProgress} / {goal}
          {type}
        </div>
      </ProgressWrapper>
      <ObjectWrapper>{object}</ObjectWrapper>
      <Controller>
        <Plus onClick={handleClickPlus} size="35" />
        <Minus onClick={handleClickMinus} size="35" />
      </Controller>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  border-radius: 10px;
  background: #ddd;
  padding: 10px;
  display: flex;
`;
const ProgressWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  .percentage {
  }
  .progress {
    font-size: 0.7rem;
  }
`;
const ObjectWrapper = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
`;
const Controller = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const Plus = styled(PlusCircleOutline)`
  cursor: pointer;
  :hover {
    color: #777;
  }
`;
const Minus = styled(MinusCircleOutline)`
  cursor: pointer;
  :hover {
    color: #777;
  }
`;

GoalCard.propTypes = {
  progress: PropTypes.number,
  goal: PropTypes.number,
  object: PropTypes.string,
  type: PropTypes.string,
};

export default GoalCard;
