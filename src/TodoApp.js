import React, { useState } from 'react';
import './App.css'
import TodoList from './TodoList';

const TodoApp = () => {
  const [columns, setColumns] = useState({
    todo: [],
    inProgress: [],
    done: []
  });

  const [newTask, setNewTask] = useState('');

  const addTask = (column) => {
    if (newTask.trim() !== '') {
      setColumns({
        ...columns,
        [column]: [...columns[column], { id: Date.now(), text: newTask }]
      });
      setNewTask('');
    }
  };

  const removeTask = (column, taskId) => {
    const updatedTasks = columns[column].filter(task => task.id !== taskId);
    setColumns({
      ...columns,
      [column]: updatedTasks
    });
  };

  const moveTask = (taskId, sourceColumn, targetColumn) => {
    const taskToMove = columns[sourceColumn].find(task => task.id === taskId);
    removeTask(sourceColumn, taskId);
    setColumns({
      ...columns,
      [targetColumn]: [...columns[targetColumn], taskToMove]
    });
  };

  return (
    <div>
        <div className='center'>
            <div style={{width: '40%' }}>
                <h1 className='heading'>Todo <span>App</span></h1>
                <div>
                    <input
                        className='inp'
                        type="text"
                        placeholder="Add a new task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        />
                    <button onClick={() => addTask('todo')}>Add Task</button>
                </div>
            </div>
        </div>
      <div className="columns">
        {Object.keys(columns).map(column => (
          <TodoList
            key={column}
            title={column}
            tasks={columns[column]}
            removeTask={(taskId) => removeTask(column, taskId)}
            moveTask={(taskId, targetColumn) => moveTask(taskId, column, targetColumn)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;