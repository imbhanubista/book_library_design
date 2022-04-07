import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import CreateBook from '../dashboard/CreateBook'
import Home from '../dashboard/Home'
import ListBook from '../dashboard/ListBook'
import ListPurchased from '../dashboard/ListPurchased'
import ForgotPass from '../landingPage/ForgotPass'
import LogIn from '../landingPage/LogIn'
import ResetPass from '../landingPage/ResetPass'
import SignUp from '../landingPage/SignUp'
import PrivateRoute from './PrivateRoute'

const Routing = () => {
  const selector = useSelector(state=>state.reducer)
  // to check whether the user is logged in or not
  const isLogged = Object.keys(selector).length>0;
  
  return (
    <BrowserRouter>
    <Routes>
          {/* <Route path = "/" element = {<>Hello</>}/> */}
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/forget' element={<ForgotPass/>}/>
        <Route path='/reset' element={<ResetPass/>}/>

        {/* given route are only visible when the user are loggedin */}
        <Route path='/home' element={<PrivateRoute isLogged={isLogged}> <Home/> </PrivateRoute>}/>
        <Route path='/create' element={<PrivateRoute isLogged={isLogged}><CreateBook/>  </PrivateRoute>}/>
        <Route path='/allbooks' element={<PrivateRoute isLogged={isLogged}> <ListBook/>  </PrivateRoute>}/>
        <Route path='/purchased' element={<PrivateRoute isLogged={isLogged}> <ListPurchased/>  </PrivateRoute>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Routing