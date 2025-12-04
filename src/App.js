import './App.css';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Form from './components/Form';
import Trends from './components/Trends';

 

function App() {
  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form/>}/>
        <Route path="/form" element={<Form />}/>
        <Route path="/trends" element={<Trends />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
