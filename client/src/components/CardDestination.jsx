import React from 'react';
import { Link } from 'react-router-dom';

const CardDestination = (props) => {
  return (
    <>
      <li className='card-item'>
        <Link
            className='card-item-link'
            to={props.path}
        >
            <figure
                className='card-img-wrapper'
                data-category={props.label}
            >
                <img
                    src={props.src}
                    alt={props.alt}
                    className='card-item-img'
                />
            </figure>
            <div
                className='card-item-description'
            >
                <h5
                    className='card-item-text'
                >
                    {props.text}
                </h5>
            </div>
        </Link>
      </li>
    </>
  )
}

export default CardDestination;
