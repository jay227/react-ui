import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import FS from './pages/FullService';
import CM from './pages/CustomerMapping';
import CashApp from './pages/CashApp';
import AppLayout from './components/AppLayout';

const App: React.FunctionComponent = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout/>}>
            <Route index element={<Home/>} />
            <Route path="*" element={<Home />} />
            <Route path='/cashapp' element={<CashApp/>}/>
            <Route path='/fullservice' element={<FS />} />
            <Route path='/customermapping' element={<CM />} />
            </Route>
        </Routes>
      </Router>         
    </>
  )
}

export default App