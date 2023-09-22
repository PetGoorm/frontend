import { useState } from 'react';

function TodoInput({ onAddTodo }) {
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      onAddTodo(newTodo); // 부모 컴포넌트로 새로운 할 일을 전달
      setNewTodo(''); // 입력창 초기화
      console.log(newTodo);
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
        value={newTodo}
        onChange={handleInputChange}
        style={{ 
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid black',
          outline: 'none',
          flex: 1,
        }}
      />
      <button onClick={handleAddTodo}>추가</button>
    </div>
    
  );
}

export default TodoInput;
