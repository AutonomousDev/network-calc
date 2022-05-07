import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Circuit_transmission_time from './pages/Circuit_transmission_time';
import Two_computer_transmission from './pages/Two_computer_transmission';
import ConvertBandwidth from './pages/ConvertBandwidth';
import EdianRepresentation from './pages/edianRepresentation';
import Home from './pages/Home';
import PersistentHTTP from './pages/PersistentHTTP';
import Proxy from './pages/Proxy';
import ConvertFileSize from './pages/ConvertFileSize';
import CarryWraparound from './pages/CarryWraparound';
import PacketQueue from './pages/PacketQueue';
import VOIP from './pages/VOIP';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="Circuit_transmission_time/" element={<Circuit_transmission_time />} />
        <Route path="two/" element={<Two_computer_transmission />} />
        <Route path="ConvertBandwidth/" element={<ConvertBandwidth/>} />
        <Route path="Edian/" element={<EdianRepresentation/>} />
        <Route path="Persistent_HTTP/" element={<PersistentHTTP/>} />
        <Route path="Proxy/" element={<Proxy/>} />
        <Route path="ConvertFileSize/" element={<ConvertFileSize/>} />
        <Route path="CarryWraparound/" element={<CarryWraparound/>} />
        <Route path="PacketQueue/" element={<PacketQueue/>}/>
        <Route path="VOIP/" element={<VOIP/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
