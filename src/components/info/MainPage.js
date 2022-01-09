/*global chrome*/
import React from 'react';
import '../../styles/info/InfoGlobal.css';
import '../../styles/info/MainPage.css';

import Header from '../global/Header';
import Footer from '../global/Footer';
import SpendingPage from './SpendingPage';

import Summary from './Summary/Summary'

const MainPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [limits, setLimits] = React.useState([])

  React.useEffect(() => {
    const chrome_data = {}
    chrome.storage.sync.get(null, (data) => {
      Object.assign(chrome_data, {
        user_info: data.user_info,
        limits: data.limits,
        transaction_info: data.transaction_info
      });
      setLimits([
        chrome_data.limits.daily,
        chrome_data.limits.weekly,
        chrome_data.limits.monthly
      ])
    });
  }, []);

  const getDayTotal = () => {
    return 0
  }

  const getWeekTotal = () => {
    return 0
  }

  const getMonthTotal = () => {
    return 0
  }

  const renderSwitch = (pageId) => {
    switch (pageId) {
    case 1:
      return <Summary spentValues={[getDayTotal(), getWeekTotal(), getMonthTotal()]} limitValues={limits} />;
    case 2:
      return <SpendingPage />;
    case 3:
      return <h1>3</h1>;
    default:
      return <Summary spentValues={[getDayTotal(), getWeekTotal(), getMonthTotal()]} limitValues={limits} />;
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
