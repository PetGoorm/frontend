import { useState } from 'react';
import api from "lib/api";
import { useRecoilValue } from 'recoil';
import  selectedDateState  from "../../stores/seletedDate";

function TodoInput({ onAddTodo }) {
  const [newTodoText, setNewTodoText] = useState(''); // 입력된 텍스트 상태 추가
  const selectedDate = useRecoilValue(selectedDateState);

  const handleInputChange = (e) => {
    setNewTodoText(e.target.value); // 입력된 텍스트 업데이트
  };

  const handleAddTodo = () => {
    if (newTodoText.trim() === '') {
      return; // 텍스트가 비어있으면 추가하지 않음
    }

    const newTodo = {
      title: newTodoText,
      day: selectedDate.format("YYYY-MM-DD"),
    };

    api.post("todo", newTodo) // 서버로 ToDo 항목 전송
      .then((response) => {
        const savedTodo = {
          id: response.data.data.id,
          title: response.data.data.title,
          done: response.data.data.done
        }; // 서버에서 저장된 ToDo 항목 정보를 받아옴
        onAddTodo(savedTodo); // 받아온 ToDo 항목을 부모 컴포넌트로 전달
        setNewTodoText(''); // 입력창 초기화
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '20px',
      marginLeft: '30px',
      marginRight: '20px',
    }}>
      <input
        type="text"
        placeholder="새로운 할 일을 입력하세요"
        value={newTodoText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        style={{ 
          background: 'white',
          border: 'none',
          borderRadius: '5px',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
          outline: 'none',
          flex: 1,
          padding: '10px',
          marginRight: '10px',
        }}
      />
      <button 
        onClick={handleAddTodo}
        style={{
          background: '#FFAE8B',
          color: 'white',
          borderRadius: '50%',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
          width: '40px',
          height: '40px',
          border: 'none',
          cursor: 'pointer',
          marginLeft: '10px',
        }}
      >
        입력
      </button>
    </div>

  );
}

export default TodoInput;