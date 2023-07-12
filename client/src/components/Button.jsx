import React from 'react';
import '../style/Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

const Button = ({ children, type, onClick, btnStyle, btnSize, link }) => {

// applies btn--primary as default style
const checkBtnStyle = STYLES.includes(btnStyle) ? btnStyle : STYLES[0];

// applies btn--medium as default size
const checkBtnSize = SIZES.includes(btnSize) ? btnStyle : SIZES[0];

  return (
    <Link to={link} className='btn-mobile'>
        <button
            className={`btn ${checkBtnStyle} ${checkBtnSize}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    </Link>
  )
};

export default Button;
