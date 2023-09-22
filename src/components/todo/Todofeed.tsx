import React, { useState, useEffect } from 'react';
import api from "lib/api";
import dayjs, { Dayjs } from 'dayjs';
import AppTasks from "./Todolist";

// ToDo 항목을 나타내는 인터페이스
interface Todo {
  id: number;
  title: string;
  day: String;
  done: boolean;
}

// TodoList 컴포넌트의 Props 타입 정의
type TodoProps = {
  selectedDate: Dayjs | null; // 또는 원하는 타입으로 변경
  onAddDate;
};


const Todofeed: React.FC<TodoProps> = ({ selectedDate }) => {
  // ToDo 항목을 담을 상태
  const [todos, setTodos] = useState<Todo[]>([]);
  // 새로운 ToDo 항목의 텍스트를 담을 상태
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    if (selectedDate !== null) {
      fetchTodos(selectedDate);
    }
  }, [selectedDate]);

  // ToDo 리스트 조회 함수
  const fetchTodos = (selectedDate) => {
    const formattedDate = selectedDate.format('YYYY-MM-DD');
    api.get(`todo/${formattedDate}`)
      .then(response => {
        setTodos(response.data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          done: item.done
        })));
        console.log(todos);
      })
      .catch(error => {
        console.log(error);
      });
  };

  

  return (
    <div>
        <AppTasks
            title="할일"
            list={todos}
        />
    </div>
  );
};

export default Todofeed;