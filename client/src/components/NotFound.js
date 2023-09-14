import React from 'react';

/**
 * Render "Not Found" component for incorrect url
 * @returns {HTMLElement} Not Found page
 */
const NotFound = () => {
    return (
        <div className="container">
            <header className="jumbotron bg-transparent text-left">
                <h2>Oops, not found!</h2>
            </header>
        </div>

    );
};

export default NotFound;