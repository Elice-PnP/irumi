import React, { useState } from "react";
import styled from "styled-components";
import { CalendarAlt } from "@styled-icons/fa-regular";

function Calendar() {
  const [date, setDate] = useState(new Date("2021-10-22"));
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <CalendarWrapper>
      <Header>
        <div className="date">
          {date.getFullYear()}년 {date.getMonth()}월
        </div>
        <div className="icon">
          <CalendarAlt />
        </div>
      </Header>
      <TableWrapper>
        <tr>
          {days.map((day, index) => (
            <th key={day} className={date.getDay() === index ? "selected" : ""}>
              {day}
            </th>
          ))}
        </tr>
        <tr>
          {days.map((day, index) => {
            const today = new Date(date);
            const theDay = new Date(
              today.setDate(today.getDate() - (date.getDay() - index))
            );
            return (
              <td
                key={day}
                className={date.getDay() === index ? "selected" : ""}
              >
                {theDay.getDate()}일
              </td>
            );
          })}
        </tr>
      </TableWrapper>
    </CalendarWrapper>
  );
}

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  .date {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
const TableWrapper = styled.table`
  border: 1px solid #555;
  border-radius: 20%;
  border-collapse: collapse;
  > tr > td,
  th {
    padding: 5px;
    border: 1px solid #555;
  }

  .selected {
    font-weight: bold;
    background-color: #aaa;
    color: #fff;
  }
`;

export default Calendar;
