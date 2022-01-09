import React from 'react';
import { exportPDF } from './Reports/pdfexport';

import '../../styles/info/InfoGlobal.css';
import '../../styles/info/MainPage.css';

import Header from '../global/Header';
import Footer from '../global/Footer';
import SpendingPage from './SpendingPage';

import Summary from './Summary/Summary'

const MainPage = () => {

  const [currentPage, setCurrentPage] = React.useState(1);

  const renderSwitch = (pageId) => {
    switch (pageId) {
    case 1:
      // TO DO - @Nigel use chrome api to populate spent and limit vlaues
      return <Summary spentValues={[1, 2, 3]} limitValues={[10, 20, 30]} />;
    case 2:
      return <SpendingPage />;
    case 3:
      return <button onClick={() => exportPDF("week", 8, 1, 2022)} className="spendButton">month pdf</button>;
    default:
      // TO DO - @Nigel use chrome api to populate spent and limit vlaues
      return <Summary spentValues={[1, 2, 3]} limitValues={[10, 20, 30]} />;
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
