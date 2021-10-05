
import './App.css';
import { BrowserRouter as Router, Switch } from "react-router-dom"
import Routes from './routes';

function App() {
  return (
    <>
      <Router>
        <Routes></Routes>
      </Router>
    </>
  );
}

export default App;
