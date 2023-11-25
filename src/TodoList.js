import React from 'react';
import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';
const TodoList = ({ title, tasks, removeTask, moveTask }) => {
  const [randomColor, setRandomColor] = useState('#000000');
  const generateRandomColor = () => {
    const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    setRandomColor(color);
  };
  useEffect(() => {
    generateRandomColor();
  }, []);
  return (
    <div className="column">
      <h2>{title}</h2>
      <ul className='uli' style={{border: `3px solid ${randomColor}` }}>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <div>
              <button onClick={() => removeTask(task.id)}>წაშლა</button>
              <button onClick={() => moveTask(task.id, 'inProgress')}>პროცესშია</button>
              <button onClick={() => moveTask(task.id, 'done')}>მზადაა</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
