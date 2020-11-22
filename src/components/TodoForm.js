import React, { useState } from "react";

export default function TodoForm(props) {
  const [task, setTask] = useState({
        subject: "",
        taskName: "",
        dueDate: "",
        time: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!task.taskName.trim()) {
      return;
    }
    console.log("here");
    props.addTask(task);
    setTask({}); 
  }


  function handleChange(e) {
    const value = (e.target.value);
    console.log(value);
    setTask({
        ...task,
        [e.target.name]: value
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="new-todo-subject"
        className="input input__lg"
        name="subject"
        autoComplete="on"
        value={task.subject}
        placeholder="Subject"
        onChange={handleChange}
      />
      <input
        type="text"
        id="new-todo-task"
        className="input input__lg"
        name="taskName"
        autoComplete="on"
        value={task.taskName}
        placeholder="Task"
        onChange={handleChange}
      />
      <input
        type="date"
        id="new-todo-date"
        className="input input__lg"
        name="dueDate"
        autoComplete="off"
        value={task.dueDate}
        onChange={handleChange}
      />
      <input
        type="time"
        id="new-todo-time"
        className="input input__lg"
        name="time"
        autoComplete="off"
        value={task.time}
        onChange={handleChange}
      />

      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}