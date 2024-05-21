import { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signOut()
    setUser(null)
  }

  return (
    <AuthedUserContext.Provider value={user}>
      <NavBar handleSignout={handleSignout}/>
      <Routes>
        {user ? (
          <Route path='/' element={<Dashboard />}/>
        ) : (
          <Route path='/' element={<Landing />}/>
        )}
        <Route path='/signup' element={<SignupForm setUser={setUser}/>}/>
        <Route path='/signin' element={<SigninForm setUser={setUser}/>}/>
      </Routes>
    </ AuthedUserContext.Provider>
  )
}

export default App