import React from 'react';
import Task from './Task';
import { useTasks } from './TodoTaskProvider';

export default function TodoList() {
  const { tasks } = useTasks();
  return (
    <table>
      <tbody>
        {
          tasks.map((task, i) => 
            <Task key={i} {...task} />
          )
        }
      </tbody>
    </table>
  );
};