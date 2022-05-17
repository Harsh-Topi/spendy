import React from 'react';
import '../../../styles/info/Summary.css';


const SectionHeader = ({ text, buttonIcon, buttonAction }) => {
  return (
    <div className="sectionHeader">
        <span className="sectionHeaderText">{text}</span>
        <button onClick={buttonAction} className="sectionHeaderButton">
          {buttonIcon}
        </button>
    </div>
  );
};

export default SectionHeader;
