import './App.css';
import Home from './pages/HomeContainer';
import Admin from './pages/AdminContainer';
import DetailPage from './pages/DetailPage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';


function App() {
  const {isAdmin} = useStateContext();

  return (
    <div className="App bg-slate-100 h-screen w-screen text-neutral-700">
      <Router>
        <Routes>
          {isAdmin ? <Route path="/" element={<Admin />} /> : <Route path="/" element={<Home />} />}
          <Route path="/detail" element={<DetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
