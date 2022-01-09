import React from 'react';
import '../../../styles/info/Reports.css';

import SingleReport from './SingleReport';

const Reports = () => {

  return (
    <div className="reportsContainer">
      <SingleReport type="Daily" color={"#1F65A6"} />
      <SingleReport type="Weekly" color={"#328FF8"} />
      <SingleReport type="Monthly" color={"#76C3FC"} />
    </div>
  );
};

export default Reports;
