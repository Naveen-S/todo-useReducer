import React, { useState } from 'react';
import { ACTIONS } from './App';

const Todo = ({ todo, dispatch }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [todoVal, setTodoVal] = useState(todo.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditMode(false);
    dispatch({
      type: ACTIONS.EDIT_TODO,
      payload: { ...todo, name: todoVal },
    });
  };

  return (
    <div>
      {!isEditMode ? (
        <div
          style={{ color: todo.completed ? 'pink' : 'black' }}
          onClick={() => {
            dispatch({ type: ACTIONS.TOGGLE_TODO, payload: todo.id });
          }}>
          {todo.name}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={todoVal}
            onChange={(e) => {
              setTodoVal(e.target.value);
            }}
          />
        </form>
      )}

      <button
        onClick={() => {
          dispatch({ type: ACTIONS.DELETE_TODO, payload: todo.id });
        }}>
        X
      </button>

      <button onClick={() => setIsEditMode(true)}>Edit</button>
    </div>
  );
};

export default Todo;
