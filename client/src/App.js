import './App.css';
import Home from './pages/HomeContainer';
import Admin from './pages/AdminContainer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';


function App() {
  const {isAdmin} = useStateContext();

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {isAdmin ? <Route path="/" element={<Admin />} /> : <Route path="/" element={<Home />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
