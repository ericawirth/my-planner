import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import NavbarComponent from '../components/NavbarComponent'


export default function TodoList ({ saveTodo }) {
  const [value, setValue] = useState('');

  return (
    <div>
    <NavbarComponent/>
    <form
      onSubmit = {(event) => {
          event.preventDefault();
          saveTodo(value);
      }}
    >
      <TextField variant="outlined" placeholder="Add task" margin="normal"
      onEdit = {(event) => {
          setValue(event.target.value);
      }}
      />
    </form>
    </div>
  );
};

