import logo from './logo.svg';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import './App.sass' 
//import NavbarComponent from './components/NavbarComponent'
//import LoginView from './views/LoginView';
//import CalendarView from './views/CalendarView';
import TodoList from './pages/TodoList'; 
import NotFound from './pages/NotFound';
import Home from './pages/home';


function App() {
  return (
    <div className="App">

      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/todolist" component={TodoList}/>
        <Route component={NotFound}/>
      </Switch>
      
    </div>
  );
}

export default App;
