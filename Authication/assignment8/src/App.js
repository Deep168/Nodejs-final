import './App.css';
import Homepage from './Homepage';
import Loginform from './Loginform';
import Registrationform from './Registrationform';
import { Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route exact path='/login' element={<Loginform />} />
        <Route exact path='/register' element={<Registrationform />} />
        <Route extact path='/welcome' element={<Welcome />} />
        
      </Routes>
    </div>
  );
}
export default App;