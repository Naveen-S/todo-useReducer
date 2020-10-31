import { useReducer, useState } from 'react';
import Todo from './Todo';
import './App.css';

export const ACTIONS = {
  ADD_TODO: 'add_todo',
  TOGGLE_TODO: 'toggle_todo',
  DELETE_TODO: 'delete_todo',
  EDIT_TODO: 'edit_todo',
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO: {
      return [...state, action.payload];
    }
    case ACTIONS.TOGGLE_TODO: {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    }
    case ACTIONS.DELETE_TODO: {
      return state.filter((todo) => {
        return todo.id !== action.payload;
      });
    }
    case ACTIONS.EDIT_TODO: {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.completed = !todo.completed;
          return { ...action.payload };
        }
        return todo;
      });
    }
    default: {
      return state;
    }
  }
};

const createTodo = (name) => {
  return {
    id: name,
    name: name,
    completed: false,
  };
};
function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.ADD_TODO,
      payload: createTodo(name),
    });
    setName('');
  };

  return (
    <div className='App'>
      Todo
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </form>
      {state.map((todo) => {
        return <Todo key={todo.id} dispatch={dispatch} todo={todo} />;
      })}
    </div>
  );
}

export default App;
