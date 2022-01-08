import React from 'react'
import '../../styles/info/MainPage.css'

const Footer = ({ setCurrentPage }) => {
    return (
        <div className="navFooter">
            <button onClick={() => { setCurrentPage(1) }} className="footerButton"><img src="summaryIcon.svg" /></button>
            <button onClick={() => { setCurrentPage(2) }} className="footerButton"><img src="limitIcon.svg" /></button>
            <button onClick={() => { setCurrentPage(3) }} className="footerButton"><img src="reportsIcon.svg" /></button>
        </div>
    )
}

export default Footer
