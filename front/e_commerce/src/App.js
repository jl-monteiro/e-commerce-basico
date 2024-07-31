import { Fragment } from 'react';
import useAuth from './hooks/useAuth';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { AuthProvider } from './contexts/auth';

import './styles/index.css'

import Header from './components/layout/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import User from './pages/User';
import CadProdutos from './pages/CadProdutos';
import Produto from './pages/Produto';

const Private = ({ Item }) => {
  const { signed } = useAuth()

  return signed > 0 ? <Item /> : <Login />
}

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route path="/" element={<Private Item={Home} />} />

          <Route exact path="/user" element={<Private Item={User} />} />
          <Route exact path="/cadProd" element={<Private Item={CadProdutos} />} />
          <Route exact path="/produto/:id" element={<Private Item={Produto} />} />

          

          <Route path="/login" element={<Login />} />
          <Route exact path="/registrar" element={<Registrar />} />


          <Route path="*" element={<Private Item={Home} />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  )
}

const App = () => {
  return (
    <div>
      <AuthProvider>

        <RoutesApp />

      </AuthProvider>
    </div>
  )
}

export default App;
