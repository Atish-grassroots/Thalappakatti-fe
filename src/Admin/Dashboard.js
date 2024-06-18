import React from 'react';
import Header from '../Common/Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Footer from '../Common/Footer';
// import Footer from './Footer';

function Dashboard() {
  return (
    <div>
      <Header />
      <Sidebar />
      <MainContent /> 
      <Footer />
      
    </div>
  );
}

export default Dashboard;