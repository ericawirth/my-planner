import logo from './logo.svg';
import './App.css';
import NavbarComponent from './components/NavbarComponent'
import './App.sass' 
import LoginView from './views/LoginView';
import CalendarView from './views/CalendarView';

function App() {
  return (
    <div className="App">
      
      <NavbarComponent/>
      <CalendarView/>
      <LoginView/>
    </div>
  );
}

export default App;
