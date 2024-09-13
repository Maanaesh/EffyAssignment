import React from 'react'
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import UserSignup from './pages/UserSignup';
import CreateCompanyPage from './pages/CreateCompanyPage';
import ListCompanies from './pages/ListCompanies';
import DetailsPage from './pages/DetailsPage';
import ListUsers from './pages/ListUsers';
import UserDetails from './pages/UserDetails';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { useColorMode } from "@chakra-ui/react";
function App() {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode("light"); // Force light mode on mount
  }, [setColorMode]);
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/createUser' element={<UserSignup/>}/>
        <Route path='/createCompany' element={<CreateCompanyPage/>}/>
        <Route path ='/ListCompanies' element={<ListCompanies/>}/>
        <Route path='/details/:id' element={<DetailsPage/>}/>
        <Route path ='/ListUsers' element={<ListUsers/>}/>
        <Route path ='/Userdetails/:id' element={<UserDetails/>}/>
      </Routes>
    </>
  )
}

export default App