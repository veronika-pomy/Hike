import React from 'react';
import CardDestination from '../components/CardDestination';
import '../style/Cards.css';

import card1 from '../assets/imgs/image-canyon.jpg';
import card2 from '../assets/imgs/image-lake.jpg';
import card3 from '../assets/imgs/image-hills.jpg';
import card4 from '../assets/imgs/image-sea.jpg';
import card5 from '../assets/imgs/image-snow.jpg';

function Cards() {
  return (
    <div className='cards'>
        <h1>Check out the TOP destinations!</h1>
        <div className="cards-container">
            <div className="cards-wrapper"></div>
            <ul className="cards-items">
                <CardDestination 
                    src={card1}
                    text="Discover the untamed beautify of Arizona's canyons"
                    label='Adventure'
                    path='/services'
                    alt="A breathtaking sunset illuminating a canyon from above"
                />
                <CardDestination 
                    src={card2}
                    text="Experience tranquility by the crystal-clear lakes of Montana"
                    label='Relax'
                    path='/services'
                    alt="A picturesque lake nestled amidst the breathtaking mountains"
                />
            </ul>
            <ul className="cards-items">
                <CardDestination 
                    src={card3}
                    text="Uncover hidden gems of the unbridled California forests"
                    label='Relax'
                    path='/services'
                    alt="A rocky mountain gracefully overlooking the vast expanse of the ocean"
                />
                <CardDestination 
                    src={card4}
                    text="Embark on a journey amidst rugged landscapes of Alaska"
                    label='Adventure'
                    path='/services'
                    alt="A calm ocean beneath mountains adorned with drifting clouds"
                />
                 <CardDestination 
                    src={card5}
                    text="Scale the snowy summits of Colorado's majestic mountains"
                    label='Adventure'
                    path='/services'
                    alt="A glistening lake nestled beneath the snow-capped pinnacle of a rugged mountain"
                />
            </ul>
        </div>
    </div>
  )
};

export default Cards;
