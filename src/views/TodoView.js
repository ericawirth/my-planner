import React from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';

export default function CalendarView() {
    return (
        <div>
            <h1 className="title">Todo List</h1> 
            <TodoList />
            <TodoForm />
        </div>
    );
};