import NavbarComponent from '../components/NavbarComponent'
import LoginView from '../views/LoginView';
import CalendarView from '../views/CalendarView';

export default function Home () {

    return (
    <div className="Home">
      <NavbarComponent/>
      <CalendarView/>
      <LoginView/>
    </div>
    );
};