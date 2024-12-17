import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup'; 
import Login from './Login'; 
import Welcome from './Welcome'; 
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        { }
      </Routes>
    </Router>
  );
}

export default App;
