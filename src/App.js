import logo from './logo.svg';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import './App.sass' 
//import LoginView from './views/LoginView';
//import CalendarView from './views/CalendarView';
import TodoView from './views/TodoView'; 
import NotFound from './views/NotFoundView';
import Home from './HomeView';
import CalendarView from './views/CalendarView'
import NavbarComponent from './components/NavbarComponent'
const DATA = [
  { id: "todo-0", subject: "Food", taskName: "Eat", dueDate: "2020-11-26", completed: true },
  { id: "todo-1", subject: "Life", taskName: "Sleep", completed: false },
  { id: "todo-2", subject: "Daily", taskName: "Repeat", completed: false },
  { id: "todo-3", subject: "Fun", taskName: "Play Mario Kart", complete: false}
];

const ClassTempData = [
  { id: 0, classTitle: "Comp455", color: "Red"},
  { id: 0, classTitle: "Comp555", color: "Green"},
];

const CalendarData = [
  {id: "1234", title: "Test1", eventType: "Event",classDetails: "None", startDate: '2020-11-25', endDate: '2020-11-25', allDay: true, startTime: "", endTime: ""},
  {id: "1235",title: "Test2", eventType: "Event",classDetails: "None", startDate: '2020-11-25', endDate: '2020-11-25', allDay: true, startTime: "", endTime: ""},
  {id: "1236",title: "Test3", eventType: "Event",classDetails: "None", startDate: '2020-11-24', endDate: '2020-11-24', allDay: true, startTime: "", endTime: ""},
  {id: "1237",title: "Smoke & Turkey with KMP", eventType: "Event",classDetails: "None", startDate: '2020-11-26', endDate: '2020-11-26', allDay: true, startTime: "", endTime: ""},
]

function App() {

  return (
    <div className="App">
        <NavbarComponent/>
          <Switch>
            <Route exact path="/"> <Redirect to="/calendar" /> </Route>
            <Route exact path="/calendar" render={() => <CalendarView classInfo={ClassTempData} callenData={CalendarData}/>}/>
            <Route exact path="/todolist" render={() => <TodoView tasks={DATA} />}/>
          </Switch>
    </div>
  );
}

export default App;
