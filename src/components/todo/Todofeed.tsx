import React, { useState, useEffect } from 'react';
import api from "lib/api";
import dayjs, { Dayjs } from 'dayjs';
import AppTasks from "./Todolist";
import { useRecoilValue } from 'recoil';
import  selectedDateState  from "../../stores/seletedDate";

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


const Todofeed: React.FC<TodoProps> = () => {
  // ToDo 항목을 담을 상태
  const [todos, setTodos] = useState<Todo[]>([]);
  // 새로운 ToDo 항목의 텍스트를 담을 상태
  const [newTodoText, setNewTodoText] = useState('');
  const selectedDate = useRecoilValue(selectedDateState);

  useEffect(() => {
    if (selectedDate !== null) {
      fetchTodos(selectedDate);
      console.log(selectedDate);
    }
  }, [selectedDate]);

  // ToDo 리스트 조회 함수
  const fetchTodos = (selectedDate) => {
    const changedDate = dayjs(selectedDate);
    const formattedDate = changedDate.format('YYYY-MM-DD');
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

  // ToDo 항목 추가 함수
  const addTodo = () => {
    if (newTodoText.trim() === '') {
      return; // 텍스트가 비어있으면 추가하지 않음
    }
    const newTodo: Todo = {
      id: 0, // 임시로 0으로 설정
      title: newTodoText,
      day: selectedDate,
      done: false,
    };

    console.log(newTodo)
    api.post("todo", newTodo) // 서버로 ToDo 항목 전송
      .then((response) => {
        console.log(response.data);
        const savedTodo = response.data.data; // 서버에서 저장된 ToDo 항목 정보를 받아옴
        setTodos([...todos, savedTodo]); // 받아온 ToDo 항목을 todos에 추가
        setNewTodoText('');
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