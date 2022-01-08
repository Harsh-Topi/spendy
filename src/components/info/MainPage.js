import React from 'react';
import '../../styles/info/InfoGlobal.css';
import '../../styles/info/MainPage.css';

import Header from '../global/Header';
import Footer from '../global/Footer';
import SpendingPage from './SpendingPage';

const MainPage = () => {

  const [currentPage, setCurrentPage] = React.useState(1);

  const renderSwitch = (pageId) => {
    switch (pageId) {
    case 1:
      return <h1>1</h1>;
    case 2:
      return <SpendingPage />;
    case 3:
      return <h1>3</h1>;
    default:
      return <h1>1</h1>;
    }
  }

  const handlePageChange = (pageId) => {
    setCurrentPage(pageId);
  }

  return (
    <div className="main">
      <Header />
      <div className="dataContainer">
        {renderSwitch(currentPage)}
      </div>
      <Footer setCurrentPage={handlePageChange} />
    </div>
  )
}

export default MainPage
