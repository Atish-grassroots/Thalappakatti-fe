import React from 'react';
import Header from '../Common/Header';
import MainContent from './MainContent';
import Footer from '../Common/Footer'; 
// import Footer from './Footer';

function AgentDashboard() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
      {/* <Footer /> */}
    </div>
  );
}

export default AgentDashboard;