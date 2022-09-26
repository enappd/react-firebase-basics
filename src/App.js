import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import Register from './screens/Register';
import Home from './screens/Home';
import Login from './screens/Login';
import UpdateUser from './screens/Update';


function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/updateUser/:username" element={<UpdateUser />} />
        </Routes>
    </BrowserRouter>
    // use of component
  );
}

export default App;
