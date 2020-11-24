import React, { useState, useRef, useEffect, useCallback } from "react";
import TodoForm from '../components/TodoForm';
import Todo from '../components/Todo';
import './Todo.css';
import FilterButton from "../components/FilterButton";
import { nanoid } from "nanoid";
import { authMiddleWare } from '../util/auth';
import { useHistory } from "react-router-dom";
import axios from 'axios';

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
  let [responseData, setResponseData] = useState('');
  let history = useHistory();

  const fetchData = useCallback(() => {
    authMiddleWare(history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get('/events')
      .then((response) => {
        setResponseData({
          todos: response.data
        });
      })
      .catch((error) => {
        console.log(error.response.status)
        if (error.response.status === 403) {
          localStorage.removeItem('AuthToken');
          history.push('/login');
        }
      })
  }, [])
  useEffect(() => {
    authMiddleWare(history);
    fetchData();
  }, [fetchData])
  useEffect(() => {
    addTodos(responseData.todos);
  }, [responseData])

  function addTodos(task) {
    if (task && task.length && task.length > 0) {
      let mappedTasks = task.filter(f => f.data.eventType && f.data.eventType === 'Todo').map(tsk => {
        return ({
          id: tsk.id, subject: tsk.data.subject, title: tsk.data.title,
          start: tsk.data.start, time: tsk.data.time, completed: tsk.data.completed
        });
      });
      setTasks(mappedTasks);
    }
  }

  function handleEdit(id, editedArr) {
    authMiddleWare(history);
    const editedTask = editedArr.filter(task => {
      return (id === task.id)
    })
    if (editedTask && editedTask.length && editedTask.length > 0) {
      let tempEdited = editedTask[0];
      const updateEvent = {
        title: tempEdited.title,
      };
      let options = {
        url: `/event/${tempEdited.id}`,
        method: 'put',
        data: updateEvent,
      };
      const authToken = localStorage.getItem('AuthToken');
      axios.defaults.headers.common = { Authorization: `${authToken}` };
      axios(options)
        .then(() => {
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    handleEdit(id, updatedTasks);
    setTasks(updatedTasks);
  }

  function handleDelete(id) {
    authMiddleWare(history);
    if (id) {
      const authToken = localStorage.getItem('AuthToken');
      axios.defaults.headers.common = { Authorization: `${authToken}` };
      axios
        .delete(`event/${id}`)
        .then(() => {
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  function deleteTask(id) {
    console.log('id',id);
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
    handleDelete(id);
  }


  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, title: newName }
      }
      return task;
    });
    handleEdit(id, editedTaskList);
    setTasks(editedTaskList);
  }

  const todoList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        subject={task.subject}
        title={task.title}
        start={task.start}
        time={task.time}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map(taskName => (
    <FilterButton
      key={taskName}
      taskName={taskName}
      isPressed={taskName === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(task) {
    authMiddleWare(history);
    let newDate = task.start? new Date(task.start+'T'+task.time).toISOString(): '';
    let newTask = {
      subject: task.subject, title: task.title, end: '', classDetails: '', backgroundColor: '', allDay: false, 
      start: newDate, time: task.time, completed: false, eventType: 'Todo', body: '',
    };

    let options = { url: '/event', method: 'post', data: newTask };
    let responseId = "";
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios(options)
      .then((e) => {
        responseId = e.data.id
        newTask.id = responseId ? responseId : nanoid();
        setTasks([...tasks, newTask]);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const tasksNoun = todoList.length !== 1 ? 'Tasks' : 'Task';
  const headingText = `${todoList.length} ${tasksNoun}`;

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
