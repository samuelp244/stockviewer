import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import InstrumentsPage from './pages/InstrumentsPage';
import Quotes from './pages/Quotes';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<InstrumentsPage/>}></Route>
        <Route path='/quotes' element={<Quotes/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
