import React from 'react';
import '../../styles/info/MainPage.css';

const Footer = ({ setCurrentPage }) => {
  return (
    <div className="navFooter">
      <div className="svgIcon">
        <button onClick={() => { setCurrentPage(1); }} className="footerButton">
          <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path className="summaryIcon" d="M8 21C6.34 21 5 22.34 5 24C5 25.66 6.34 27 8 27C9.66 27 11 25.66 11 24C11 22.34 9.66 21 8 21ZM8 9C6.34 9 5 10.34 5 12C5 13.66 6.34 15 8 15C9.66 15 11 13.66 11 12C11 10.34 9.66 9 8 9ZM8 33C6.34 33 5 34.36 5 36C5 37.64 6.36 39 8 39C9.64 39 11 37.64 11 36C11 34.36 9.66 33 8 33ZM14 38H42V34H14V38ZM14 26H42V22H14V26ZM14 10V14H42V10H14Z" fill="black"/>
          </svg>
        </button>
      </div>
      <div className="svgIcon">
        <button onClick={() => { setCurrentPage(2); }} className="footerButton" >
          <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="limitIcon" d="M22.2083 17.0833H18.7917V13.6666H22.2083V17.0833ZM22.2083 10.25H18.7917V1.70831H22.2083V10.25ZM11.9583 30.75C10.0792 30.75 8.55876 32.2875 8.55876 34.1666C8.55876 36.0458 10.0792 37.5833 11.9583 37.5833C13.8375 37.5833 15.375 36.0458 15.375 34.1666C15.375 32.2875 13.8375 30.75 11.9583 30.75ZM29.0417 30.75C27.1625 30.75 25.6421 32.2875 25.6421 34.1666C25.6421 36.0458 27.1625 37.5833 29.0417 37.5833C30.9208 37.5833 32.4583 36.0458 32.4583 34.1666C32.4583 32.2875 30.9208 30.75 29.0417 30.75ZM13.8375 22.2083H26.5646C27.8458 22.2083 28.9733 21.5079 29.5542 20.4487L35.875 8.47331L32.8854 6.83331L26.5646 18.7916H14.5721L7.29459 3.41665H1.70834V6.83331H5.12501L11.275 19.7996L8.96876 23.9679C7.72168 26.2571 9.36168 29.0416 11.9583 29.0416H32.4583V25.625H11.9583L13.8375 22.2083Z" fill="black"/>
          </svg>
        </button>
      </div>
      <div className="svgIcon">
        <button onClick={() => { setCurrentPage(3); }} className="footerButton">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="reportIcon" d="M24.145 7.33335L33 16.1884V36.6667H11V7.33335H24.145ZM25.6667 3.66669H11C8.98334 3.66669 7.33334 5.31669 7.33334 7.33335V36.6667C7.33334 38.6834 8.98334 40.3334 11 40.3334H33C35.0167 40.3334 36.6667 38.6834 36.6667 36.6667V14.6667L25.6667 3.66669ZM27.5 20.1667H20.1667V22H25.6667C26.675 22 27.5 22.825 27.5 23.8334V29.3334C27.5 30.3417 26.675 31.1667 25.6667 31.1667H23.8333V33H20.1667V31.1667H16.5V27.5H23.8333V25.6667H18.3333C17.325 25.6667 16.5 24.8417 16.5 23.8334V18.3334C16.5 17.325 17.325 16.5 18.3333 16.5H20.1667V14.6667H23.8333V16.5H27.5V20.1667Z" fill="black"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Footer;
