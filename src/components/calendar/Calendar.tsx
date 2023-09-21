import { useEffect, useState } from "react";
import {
  CalendarContainer,
  CalendarHeader,
  DateContainer,
  DateLabel,
  DayContainer,
} from "./styles";
import dayjs from "dayjs";
import { generateDate } from "./generateDate";
import Leftbutton from "./calenderLeft.png";
import Rightbutton from "./calenderRight.png";

interface DateProps {
  currentMonth: boolean;
  date: dayjs.Dayjs;
}

export const Calendar = () => {
  const [date, setDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null); // 선택한 날짜 상태 추가
  const dates = [
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
  ];
  const [records, setRecords] = useState<DateProps[]>([]);
  const prevMonth = () => {
    setDate((prev) => prev.add(-1, "month"));
  };

  const nextMonth = () => {
    setDate((prev) => prev.add(1, "month"));
  };

  const handleDateClick = (clickedDate: dayjs.Dayjs) => {
    // 클릭한 날짜를 선택한 날짜로 설정
    setSelectedDate(clickedDate);
  };

  useEffect(() => {
    const arrayOfDate = generateDate(date);
    setRecords(arrayOfDate);
  }, [date]);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <img src = {Leftbutton} alt = "left" onClick={prevMonth}/>
        <div className="block xl:hidden">
          <span>
            {date.year()}년 {date.month() + 1}월
          </span>
        </div>
        <img src = {Rightbutton} alt = "right" onClick={nextMonth}/>
      </CalendarHeader>
      <DateContainer>
        {dates.map((date, index) => (
          <div key={index}>{date}</div>
        ))}
      </DateContainer>
      <DayContainer>
        {records.map(({ date, currentMonth }) => {
          const isToday = date.isSame(dayjs(), "day");
          const isSelected = selectedDate?.isSame(date, "day"); // 클릭한 날짜와 현재 날짜 비교
          return (
            <DateLabel
              $currentMonth={currentMonth}
              $isToday={isToday}
              $isSelected={isSelected} // 선택한 날짜인지 여부 전달
              onClick={() => handleDateClick(date)}
            >
              {date.date()}
            </DateLabel>
          );
        })}
      </DayContainer>
    </CalendarContainer>
  );
};
