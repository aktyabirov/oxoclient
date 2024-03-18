import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <div>
        <Header/>
        <ToastContainer />
      <main>
        <Outlet />
      </main>
     <Footer/>
    </div>
  );
};

export default Layout;
