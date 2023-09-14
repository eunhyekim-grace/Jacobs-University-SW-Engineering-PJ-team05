import React from 'react';
import logo from '../img/beer.png';

/**
* Renders a Home component
* @returns {HTMLElement} Home Page
*/

const Home = () => {
    return (
        <div className="container">
            <header className="jumbotron bg-transparent text-center">
                <h2>Welcome to Beer Game!</h2>
                <img src={logo} width="20%" alt="Beer Game Logo" />
            </header>
        </div>
    );
};

export default Home;