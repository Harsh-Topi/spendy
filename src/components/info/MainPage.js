/*global chrome*/
import React from 'react';
import { exportPDF } from './Reports/pdfexport';

import '../../styles/info/InfoGlobal.css';
import '../../styles/info/MainPage.css';

import Header from '../global/Header';
import Footer from '../global/Footer';
import SpendingPage from './SpendingPage';

import Summary from './Summary/Summary';

import Reports from './Reports/Reports'

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
        })
        setLimits([chrome_data.limits.daily, chrome_data.limits.weekly, chrome_data.limits.monthly])
      })
  }, []);

  const renderSwitch = (pageId) => {
    switch (pageId) {
        case 1:
          return <Summary spentValues={[1, 2, 3]} limitValues={limits} />;
        case 2:
          return <SpendingPage />;
        case 3:
          return <Reports />;
        default:
          return <Summary spentValues={[1, 2, 3]} limitValues={limits} />;
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
