import './App.css';
import Home from './pages/HomeContainer';
import Admin from './pages/AdminContainer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


function App() {
  return (
      <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
