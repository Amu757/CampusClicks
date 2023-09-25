import React, { createContext, useReducer } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
// import Home from './components/Home'
import Home from './components/Homepage'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import Aminpanel from "./components/admindashboard/Adminpanel"
import Logout from './components/Logout'
import Profile from './components/Profile'
import Errorpage from './components/Errorpage'

import { initialstate, reducer } from './reducer/UseReducer'
import LoadingAnimations from './components/LoadingAnimations'

export const UserContext = createContext();
const UserDataContext = createContext();

const Routing = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/admin' element={<Aminpanel />} />
        <Route path='*' element={<Errorpage />} />
      </Routes>

    </>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialstate)

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        {/* navbar if used in future */}
        {/* <Navbar /> */}

        <Routing />

      </UserContext.Provider>
    </>)
}

export default App