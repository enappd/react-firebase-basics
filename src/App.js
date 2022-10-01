import './App.css';
import SocialLogin from './Screens/Login';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './Screens/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SocialLogin/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
