import './App.css';
import Header from './components/header';
import UserForm from './components/form';
import AddSector from './components/addSector';
import Responses from './components/responses';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path='addsector' element={<AddSector />} />
        <Route path='responses' element={<Responses />} />
      </Routes>
    </div>
  );
}

export default App;
