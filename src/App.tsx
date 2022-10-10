import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import InstrumentsPage from './pages/InstrumentsPage';
import Quotes from './pages/Quotes';
import {RiStockFill} from 'react-icons/ri'

function App() {
  return (
    <div className='grid gap-6 bg-slate-50'>
      <div className='flex justify-start p-2 '>
        <div className='flex px-7'>
          <span className='my-auto'><RiStockFill size={'28px'}/></span>
          <p className='p-2 text-lg font-belgrano'>StockViewer</p>
        </div>
      </div>
      <div className='flex justify-center font-poppins'>
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
