import React, { useState, useRef, useEffect } from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  
  export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');
  
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
  
    const wasEditing = usePrevious(isEditing);
  
    function handleChange(e) {
      setNewName(e.target.value);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      if (!newName.trim()) {
        return;
      }
      props.editTask(props.id, newName);
      setNewName("");
      setEditing(false);
    }
  
    const editingTemplate = (
      <form className="stack-small" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="todo-label" htmlFor={props.id}>
            New name for {props.title}
          </label>
          <input
            id={props.id}
            className="todo-text"
            type="text"
            value={newName}
            onChange={handleChange}
            ref={editFieldRef}
          />
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn todo-cancel"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn__primary todo-save">
            Save
          </button>
        </div>
      </form>
    );
  
    const viewTemplate = (
      <div className="stack-small">
        <div className="c-cb">
            <input
              id={props.id}
              type="checkbox"
              defaultChecked={props.completed}
              onChange={() => props.toggleTaskCompleted(props.id)}
            />
            <label className="todo-label is-capitalized" htmlFor={props.id}>
                {props.subject}: {props.title} 
            </label>
            <br></br>
            <label className="todo-label-info">Date: {props.start? new Date(props.start).toUTCString(): " "}
            </label>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn_e_d" id="todo-edit"
            onClick={() => setEditing(true)}
            ref={editButtonRef}
            >
              EDIT
            </button>
            <button
              type="button"
              className="btn btn__danger btn_e_d"
              onClick={() => props.deleteTask(props.id)}
            >
              Delete
            </button>
        </div>
      </div>
    );
  
  
    useEffect(() => {
      if (!wasEditing && isEditing) {
        editFieldRef.current.focus();
      }
      if (wasEditing && !isEditing) {
        editButtonRef.current.focus();
      }
    }, [wasEditing, isEditing]);
  
    return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
  }