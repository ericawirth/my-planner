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


function App() {
  return (
    <div className="App">

        <NavbarComponent/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/todolist" component={TodoView}/>
          </Switch>
      
      
    </div>
  );
}

export default App;
