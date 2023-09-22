import PropTypes from 'prop-types';
import { useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import {
  Card,
  CardHeader,
} from '@mui/material';
// components
import TaskItem from "./TodoItem";
import TodoInput from './TodoInput';

// ----------------------------------------------------------------------

AppTasks.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppTasks({ title, list, ...other }) {
  const { control } = useForm({
    defaultValues: {
      taskCompleted: ['2'],
    },
  });

  const [isAddingTodo, setIsAddingTodo] = useState(false); // 할 일 입력창을 표시할지 여부 상태 추가
  const [todos, setTodos] = useState(list);

  // 새로운 할 일 추가 함수
  const handleAddTodo = (newTodo) => {
    const newTask = {
      id: (todos.length + 1).toString(), // 임의의 ID 생성 (실제로는 고유한 ID를 사용해야 함)
      title: newTodo,
    };
    setTodos([...todos, newTask]);
    setIsAddingTodo(false); // 입력창 닫기

    console.log(todos);
  };

  return (
    <Card style={{ height: "460px", overflowY: 'auto' }}>

      <div style={{ display: 'flex'}}>
        <CardHeader title={title} />
        <button style={{ marginTop: "25px", fontSize: "20px", background: "white", borderRadius: "30px"}}
        onClick={() => setIsAddingTodo(true)}>+</button>
      </div>
      {isAddingTodo && (
        <TodoInput onAddTodo={handleAddTodo} />
      )}

      <Controller
        name="taskCompleted"
        control={control}
        render={({ field }) => {
          const onSelected = (task) =>
            field.value.includes(task) ? field.value.filter((value) => value !== task) : [...field.value, task];

          return (
            <>
              {list.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  checked={field.value.includes(task.id)}
                  onChange={() => field.onChange(onSelected(task.id))}
                />
              ))}
            </>
          );
        }}
      />
    </Card>
  );
}
