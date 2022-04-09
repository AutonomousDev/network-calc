import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Circuit_transmission_time from './pages/Circuit_transmission_time';
import Two_computer_transmission from './pages/Two_computer_transmission';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Circuit_transmission_time />} />
        <Route path="two/" element={<Two_computer_transmission />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
