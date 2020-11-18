import logo from './logo.svg';
import './App.css';
import NavbarComponent from './components/NavbarComponent'
import './App.sass' 
import LoginView from './views/LoginView';

function App() {
  return (
    <div className="App">
      
      <NavbarComponent/>
      <LoginView/>
    </div>
  );
}

export default App;
