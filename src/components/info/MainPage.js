/*global chrome*/
import React from 'react';
import { exportPDF } from './Reports/pdfexport';

import '../../styles/info/InfoGlobal.css';
import '../../styles/info/MainPage.css';

import Header from '../global/Header';
import Footer from '../global/Footer';
import SpendingPage from './SpendingPage';

import Summary from './Summary/Summary'
import shortNumber from 'short-number';

const MainPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [limits, setLimits] = React.useState([])
  const [transaction_info, setTransactionInfo] = React.useState([])

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
      setTransactionInfo(chrome_data.transaction_info)
    });
  }, []);

  const getDayTotal = (dd=undefined, mm=undefined, yyyy=undefined, shortened=false) => {
    let today = new Date();
    if (!dd) dd = String(today.getDate())
    if (!mm) mm = String(today.getMonth() + 1)
    if (!yyyy) yyyy = today.getFullYear()
    let key = mm + '/' + yyyy;

    if (transaction_info[key] == undefined) {
      return 0;
    }

    let days = transaction_info[key].days
    if (days[parseInt(dd)] == undefined) {
      return 0;
    }

    let total = 0
    let items = days[parseInt(dd)]
    for (var item in items) {
      total += parseFloat(items[item].amount);
    }
    if (shortened) {
      return shortNumber(parseInt(total.toFixed()));
    } else {
      return parseInt(total.toFixed());
    }
  }

  const getWeekTotal = () => {
    let day = new Date();
    let total = 0;
    for (var i = 0; i < 7; i++) {
      let dd = String(day.getDate());
      let mm = String(day.getMonth() + 1);
      let yyyy = day.getFullYear();
      total += getDayTotal(dd, mm, yyyy, true);
      day.setDate(day.getDate() - 1);
    }
    return shortNumber(parseInt(total.toFixed()))
  }

  const getMonthTotal = () => {
    let today = new Date();
    let mm = String(today.getMonth() + 1);
    let yyyy = today.getFullYear();
    let key = mm + '/' + yyyy;
    if (transaction_info[key] == undefined) {
      return 0;
    }
    return shortNumber(parseInt(transaction_info[key].amount_spent.toFixed()));
  }

  const renderSwitch = (pageId) => {
    switch (pageId) {
    case 1:
      return <Summary spentValues={[getDayTotal(), getWeekTotal(), getMonthTotal()]} limitValues={limits} />;
    case 2:
      return <SpendingPage limits={limits} setLimits={setLimits}/>;
    case 3:
      return <button onClick={() => exportPDF("month", 8, 1, 2022)} className="spendButton">month pdf</button>;
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
