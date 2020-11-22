import logo from './logo.svg';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import './App.sass' 
//import LoginView from './views/LoginView';
//import CalendarView from './views/CalendarView';
import TodoView from './views/TodoView'; 
import NotFound from './views/NotFoundView';
import Home from './HomeView';
import NavbarComponent from './components/NavbarComponent'

const DATA = [
  { id: "todo-0", subject: "Food", taskName: "Eat", dueDate: "2020-11-26", completed: true },
  { id: "todo-1", subject: "Life", taskName: "Sleep", completed: false },
  { id: "todo-2", subject: "Daily", taskName: "Repeat", completed: false },
  { id: "todo-3", subject: "Fun", taskName: "Play Mario Kart", complete: false}
];

function App() {

  return (
    <div className="App">
        <NavbarComponent/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/todolist" render={() => <TodoView tasks={DATA} />}/>
          </Switch>
    </div>
  );
}

export default App;
