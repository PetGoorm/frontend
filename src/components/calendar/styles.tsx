import styled from "styled-components";

export const CalendarContainer = styled.div`
  padding: 6px;
  border-radius: 8px;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 14px;

  img {
    width: 26px;
    cursor: pointer;
  }
`;

export const DateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-gap: 8px;
`;

export const DayContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-gap: 8px;
`;

export const DateLabel = styled.div<{ $currentMonth?: boolean; $isToday?: boolean; $isSelected?: boolean }>`
    color: ${(props) => (props.$currentMonth ? `black` : "gray")};
    border: ${(props) => (props.$isToday ? "2px solid black" : props.$isSelected ? "2px solid gray" : "none")}; // 현재 날짜에 빨간색 테두리, 선택한 날짜에 파란색 테두리 추가
    border-radius: 50%; // 동그라미 모양으로 만들기
    width: 32px; // 동그라미 크기 조절
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;