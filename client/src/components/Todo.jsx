import React, { useReducer, useState } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "addtodo":
      action.setText("");
      return {
        ...state,
        todos: [{ text: action.payload, isCompleted: false }, ...state.todos],
        todoCount: state.todoCount + 1,
      };
    case "todo-completed":
      return {
        ...state,
        todos: state.todos.map((t, i) =>
          i === action.payload ? { ...t, isCompleted: !t.isCompleted } : t
        ),
      };
    default:
      return state;
  }
};
const Todo = () => {
  const [text, setText] = useState("");
  const [{ todoCount, todos }, dispatch] = useReducer(reducer, {
    todos: [],
    todoCount: 0,
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "addtodo", payload: text, setText });
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button>Add</button>
      </form>
      <p>{todoCount}</p>
      {/* <pre>{JSON.stringify(todos, null, 1)}</pre> */}
      <ul>
        {todos.map((t, index) => (
          <li
            key={index}
            onClick={() => dispatch({ type: "todo-completed", payload: index })}
            style={{ textDecoration: t.isCompleted ? "line-through" : "" }}
          >
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
