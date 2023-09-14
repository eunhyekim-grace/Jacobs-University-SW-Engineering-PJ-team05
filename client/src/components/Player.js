import React, { useState, useEffect } from 'react';

// Retrieve services from user
import UserService from '../services/user.service';

/**
 * Renders Player component
 * @returns {HTMLElement} Player Component
 */
const Player = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPlayerSources().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const content =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message || error.toString();
                setContent(content);
            }
        );
    }, []);

    return (
        <div className="container">
            <header className="jumbotron bg-transparent">
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default Player;