import { useEffect, useState} from "react";
import {
  CalendarContainer,
  CalendarHeader,
  DateContainer,
  DateLabel,
  DayContainer,
  DateLabelButton,
} from "./styles";
import dayjs from "dayjs";
import { generateDate } from "./generateDate";
import { useRecoilState } from 'recoil';
import Leftbutton from "./calenderLeft.png";
import Rightbutton from "./calenderRight.png";
import { Card } from '@mui/material';
import selectedDateState from "stores/seletedDate";

interface DateProps {
  currentMonth: boolean;
  date: dayjs.Dayjs;
}

export const Calendar = () => {
  const [date, setDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState); // 선택한 날짜 상태 추가
  const dates = ["일","월","화","수","목","금","토"];
  const [records, setRecords] = useState<DateProps[]>([]);
  const prevMonth = () => {
    setDate((prev) => prev.add(-1, "month"));
  };

  const nextMonth = () => {
    setDate((prev) => prev.add(1, "month"));
  };

  const handleDateClick = (clickedDate: dayjs.Dayjs) => {
    setSelectedDate(clickedDate);
    console.log("클릭된 날짜:", clickedDate.format("YYYY-MM-DD"));
  };

  useEffect(() => {
    const arrayOfDate = generateDate(date);
    setRecords(arrayOfDate);
  }, [date]);

  return (
    <Card style={{ height: "460px" }}>
        <CalendarContainer>
        <CalendarHeader>
            <span>
                {date.year()}년 {date.month() < 9 ? `0${date.month() + 1}` : date.month() + 1}월
            </span>
            <img src = {Leftbutton} alt = "left" onClick={prevMonth}/>
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
                <>
                    <DateLabel
                    $currentMonth={currentMonth}
                    $isToday={isToday}
                    $isSelected={isSelected}
                    onClick={() => handleDateClick(date)}
                    >
                    <DateLabelButton/>
                    {date.date()}
                    </DateLabel>
                </>

            );
            })}
        </DayContainer>
        </CalendarContainer>
    </Card>
  );
};
