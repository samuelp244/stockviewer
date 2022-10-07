import React from 'react';
import {BrowserRouter as Router,Routes,Route, Navigate, Link} from "react-router-dom"
import InstrumentsPage from './pages/InstrumentsPage';
import Quotes from './pages/Quotes';
function App() {
  return (
    <div className='grid gap-6'>
      <div className='flex justify-start p-2'><p className='p-2 text-sm'>STOCKVIEWER</p></div>
      <div className='flex justify-center'>
    <Router>
      <Routes>
        <Route path='/' element={<InstrumentsPage/>}></Route>
        <Route path='/quotes/:symbol' element={<Quotes/>}></Route>
        {/* <Route path='*'><Link to='/'></Link></Route> */}
        
      </Routes>
    </Router>
    </div>
    </div>
  );
}

export default App;
