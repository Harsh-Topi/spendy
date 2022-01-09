import React from 'react';
import '../../../styles/info/Summary.css';


const LimitBubble = ({ color, spent, limit, interval }) => {
  return (
    <div style={{ background: color }} className="bubble">
      <span className="bubbleNums">{`$${spent} / $${limit}`}</span>
      <span className="bubbleText">{interval}</span>
    </div>
  );
};

export default LimitBubble;
