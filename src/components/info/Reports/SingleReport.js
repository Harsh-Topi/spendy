/*global chrome*/
import React from 'react';
import '../../../styles/info/Reports.css';

import Select from 'react-select';

import { exportPDF } from './pdfExport';

const SingleReport = ({color, type}) => {

  const [selectedOption, setSelectedOption] = React.useState(null);
  const [dropdownOptions, setDropdownOptions] = React.useState([]);

  React.useEffect(() => {
    const chrome_data = {};
    chrome.storage.sync.get(null, (data) => {
      Object.assign(chrome_data, {
        user_info: data.user_info,
        limits: data.limits,
        transaction_info: data.transaction_info
      });
      if (type === "Daily") {
        setDropdownOptions(getDailyOptions(chrome_data.transaction_info));
      } else if (type === "Weekly") {
        setDropdownOptions(getWeeklyOptions(chrome_data.transaction_info));
      } else {
        setDropdownOptions(getMonthlyOptions(chrome_data.transaction_info));
      }
    });
  }, []);

  const getDailyOptions = (info) => {
    let dailyOptions = [];
    for (const month in info) {
      for (const day in info[month]["days"]) {
        let dateString = day.concat('/' + month);
        dailyOptions.push({value: dateString, label: dateString});
      }
    }
    setDropdownOptions(dailyOptions);
    return dailyOptions;
  };

  const getWeeklyOptions = (info) => {
    let weeklyOptions = [];
    let today = new Date();
    for (let i = 0; i < 365;) {
      // get month/year from today object
      let monthYear = info[`${String((today.getMonth() + 1))}/${today.getFullYear()}`];
      if (monthYear && monthYear["days"][today.getDate()]) {
        let day = `${today.getDate()}/${String((today.getMonth() + 1))}/${today.getFullYear()}`;
        let weekAgoDate = new Date(new Date(today).setDate(today.getDate() - 7));
        let weekAgoString = `${weekAgoDate.getDate()}/${String((weekAgoDate.getMonth() + 1))}/${weekAgoDate.getFullYear()}`;

        let interval = `${weekAgoString} - ${day}`;
        // add option
        weeklyOptions.push({value: day, label: interval});
        today.setDate(today.getDate() - 7);
        i += 7;
      } else {
        today.setDate(today.getDate() - 1);
        i += 1;
      }
    }
    setDropdownOptions(weeklyOptions);
    return weeklyOptions;
  };

  const getMonthlyOptions = (info) => {
    let monthlyOptions = [];
    for (const month in info) {
      monthlyOptions.push({value: month, label: month});
    }
    setDropdownOptions(monthlyOptions);
    return monthlyOptions;
  };

  const handleChange = (selected) => {
    setSelectedOption(selected);
  };


  return (
    <div style={{background: color}} className="singleReport">
      <div className="reportHeader">
        <span className="reportHeaderTitle">{type}</span>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={dropdownOptions}
        />
      </div>
      <div className="reportSummary"></div>
      <div className="reportFooter">
        <button onClick={() => {
          const date = selectedOption.value.split('/');
          if (type === "Monthly") {
            exportPDF(type, 1, date[0], date[1]);
          } else {
            exportPDF(type, date[0], date[1], date[2]);
          }
        }} className="downloadButton">Download Report (PDF)</button>
      </div>
    </div>
  );
};

export default SingleReport;
