import React from 'react';

/**
 * Component for the About page.
 * @returns {HTMLElement} About Page
 */
const About = () => {
    return (
        <div className="container">
            <header className="jumbotron bg-transparent text-left">
                <h2>About Page</h2>
                <p>This is a Beer Game web app developed by Jacobs University Bremen's students for Software Engineering project under professor Peter Baumann</p>
            </header>
        </div>
    );
};

export default About;