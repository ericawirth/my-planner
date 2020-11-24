import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import TodoView from './views/TodoView';
import LoginView from './/views/LoginView';
import CalendarView from './views/CalendarView'
import logo from './logo.svg';
import NavbarComponent from './components/NavbarComponent'
import NotFound from './views/NotFoundView';
import './App.css';
import './App.sass' 
import AddClassView from './views/AddClassView';

const DATA = [
  // { id: "todo-0", subject: "Food", taskName: "Eat", dueDate: "2020-11-26", completed: true },
  // { id: "todo-1", subject: "Life", taskName: "Sleep", completed: false },
  // { id: "todo-2", subject: "Daily", taskName: "Repeat", completed: false },
  // { id: "todo-3", subject: "Fun", taskName: "Play Mario Kart", complete: false }
];

const ClassTempData = [
  { id: 0, classTitle: "Comp455", color: "Red" },
  { id: 0, classTitle: "Comp555", color: "Green" },
];

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarComponent />
        <Switch>
          <Route exact path="/"> <Redirect to="/calendar" /> </Route>
          <Route exact path="/calendar" component={CalendarView} />
          <Route exact path="/todolist" render={() => <TodoView tasks={DATA} />} />
          <Route exact path="/login" component={LoginView} />
          <Route exact path="/addclass" component={AddClassView}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
