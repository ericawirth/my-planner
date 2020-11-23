import React, { useState, useRef, useEffect } from "react";
import TodoForm from '../components/TodoForm';
import Todo from '../components/Todo';
import './Todo.css';
import FilterButton from "../components/FilterButton";
import { nanoid } from "nanoid";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  
  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };
  
  const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function TodoView(props) {
    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map(task => {
          // if this task has the same ID as the edited task
          if (id === task.id) {
            // use object spread to make a new object
            // whose `completed` prop has been inverted
            return {...task, completed: !task.completed}
          }
          return task;
        });
        setTasks(updatedTasks);
      }
    
    
      function deleteTask(id) {
        const remainingTasks = tasks.filter(task => id !== task.id);
        setTasks(remainingTasks);
      }
    
    
      function editTask(id, newName) {
        const editedTaskList = tasks.map(task => {
        // if this task has the same ID as the edited task
          if (id === task.id) {
            //
            return {...task, name: newName}
          }
          return task;
        });
        setTasks(editedTaskList);
      }
    
    const todoList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
        <Todo
        id={task.id}
        subject={task.subject}
        taskName={task.taskName}
        dueDate={task.dueDate}
        time={task.time} 
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
        />
    ));

    const filterList = FILTER_NAMES.map(name => (
        <FilterButton
          key={name}
          name={name}
          isPressed={name === filter}
          setFilter={setFilter}
        />
      ));
    
      function addTask(task) {
        console.log(task);
        const newTask = { id: "todo-" + nanoid(), subject: task.subject, taskName: task.taskName, 
                        dueDate: task.dueDate, time: task.time, completed: false };
        setTasks([...tasks, newTask]);
        console.log(newTask);
      }
    
    
      const tasksNoun = todoList.length !== 1 ? 'Tasks' : 'Task';
      const headingText = `${todoList.length} ${tasksNoun} Remaining`;
    
      const listHeadingRef = useRef(null);
      const prevTaskLength = usePrevious(tasks.length);
    
      useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
          listHeadingRef.current.focus();
        }
      }, [tasks.length, prevTaskLength]);

    return (
        <div className="todoapp stack-large">
            <h2 className="label-wrapper">
                <label htmlFor="todo-title" className="label__lg">
                <strong>To-Do</strong> 
                </label>
            </h2>    
            <TodoForm addTask={addTask} />
        <div className="filters btn-group stack-exception">
            {filterList}
        </div>
        <div className="list">
        <h2 id="list-heading" className="title" tabIndex="-1" ref={listHeadingRef}>
          {headingText}
        </h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {todoList}
        </ul>
        </div>
      </div>
      );
};
