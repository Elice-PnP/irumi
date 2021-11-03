import React, { useState } from "react";
import styled from "styled-components";
import { CalendarAlt } from "@styled-icons/fa-regular";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

registerLocale("ko", ko);

function Calendar() {
  const [date, setDate] = useState(new Date());
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const handleClickDate = (dateToChange) => {
    setDate(dateToChange);
  };

  return (
    <CalendarWrapper>
      <Header>
        <div className="date">
          {date.getFullYear()}년 {date.getMonth() + 1}월
        </div>
        <label className="calendar">
          <DatePicker
            selected={date}
            onChange={(theDate) => {
              handleClickDate(theDate);
            }}
            shouldCloseOnSelect={true}
            locale="ko"
            dateFormat="yyyy.MM.dd(eee)"
            customInput={<input hidden />}
            showPopperArrow={false}
          />
          <CalendarIcon size="40" />
        </label>
      </Header>
      <TableWrapper>
        {days.map((day, index) => {
          const today = new Date(date);
          const theDay = new Date(
            today.setDate(today.getDate() - (date.getDay() - index))
          );
          return (
            <CalendarColumn
              key={day}
              onClick={() => {
                handleClickDate(theDay);
              }}
            >
              <div className="day">{day}</div>
              <div
                className={date.getDay() === index ? "selected date" : "date"}
              >
                <div className="background" />
                <div>{theDay.getDate()}</div>
              </div>
            </CalendarColumn>
          );
        })}
      </TableWrapper>
    </CalendarWrapper>
  );
}

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 5px;
  .date {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .calendar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
const TableWrapper = styled.div`
  position: relative;
  border: 1px solid #aaa;
  border-collapse: collapse;
  border-radius: 7px;
  display: flex;
  height: 70px;
  > div:nth-child(n) {
    border-right: 1px solid #ccc;
  }
  > div:first-child {
    .day {
      border-top-left-radius: 7px;
    }
    color: #777;
  }
  > div:last-child {
    .day {
      border-top-right-radius: 7px;
    }
    border: none;
    color: #777;
  }
`;

const CalendarColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 5px;
  cursor: pointer;
  :hover {
    .background {
      position: absolute;
      z-index: -1;
      bottom: 0px;
      border: 13px solid lightgray;
      border-radius: 50%;
    }
  }
  .day {
    background: #333;
    color: #fafafa;
    font-weight: bold;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 3px;
  }
  .date {
    font-weight: bold;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 5px;
  }
  .selected {
    position: relative;
    color: white;
    font-weight: bold;
    .background {
      position: absolute;
      z-index: -1;
      bottom: 0px;
      border: 13px solid red;
      border-radius: 50%;
    }
  }
`;
const CalendarIcon = styled(CalendarAlt)`
  cursor: pointer;
`;

export default Calendar;
