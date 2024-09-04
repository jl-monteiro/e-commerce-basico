import { Fragment } from "react";
import useAuth from "./hooks/useAuth";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./contexts/auth";

import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import User from "./pages/User";
import Produto from "./pages/Produto";

import Gerenciar from "./pages/Gerenciar";
import { SearchProvider } from "./contexts/SearchContext";
import Pagamento from "./pages/Pagamento";
import Footer from "./components/layout/Footer";
import ConfirmCompra from "./pages/ConfirmCompra";

const Private = ({ Item, GoTo }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <GoTo />;
};

const PrivateAdmin = ({ Item }) => {
  const { signed, user } = useAuth();

  const isAdmin = user && user.tipo === "admin";

  return signed && isAdmin > 0 ? <Item /> : <Home />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Header />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />

          <Route
            exact
            path="/user"
            element={<Private Item={User} GoTo={Login} />}
          />

          <Route
            exact
            path="/compra"
            element={<Private Item={ConfirmCompra} GoTo={Login} />}
          />

          <Route
            exact
            path="/pay"
            element={<Private Item={Pagamento} GoTo={Login} />}
          />

          <Route
            exact
            path="/gerenciar"
            element={<PrivateAdmin Item={Gerenciar} />}
          />

          <Route
            exact
            path="/produto/:id"
            element={<Private Item={Produto} GoTo={Login} />}
          />

          <Route path="/login" element={<Private Item={Home} GoTo={Login} />} />
          <Route
            exact
            path="/registrar"
            element={<Private Item={Home} GoTo={Registrar} />}
          />

          <Route path="*" element={<Private Item={Home} />} />
        </Routes>
        <Footer />
      </Fragment>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <div>
      <AuthProvider>
        <SearchProvider>
          <RoutesApp />
        </SearchProvider>
      </AuthProvider>
    </div>
  );
};

export default App;