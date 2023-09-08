import React from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import NewEnquiry from './NewEnquiry'
import PendingEnquiry from './PendingEnquiry'
import ClosedEnquiry from './ClosedEnquiry'
import Start from './Start'
import CreateQuery from './CreateQuery'



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}>
      <Route path='/newEnquiry' element={<NewEnquiry />}></Route>
      <Route path='/pendingEnquiry' element={<PendingEnquiry />}></Route>
      <Route path='/closedEnquiry' element={<ClosedEnquiry />}></Route>
      </Route>
      <Route path='/start' element={<Start />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/createQuery' element={<CreateQuery />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;