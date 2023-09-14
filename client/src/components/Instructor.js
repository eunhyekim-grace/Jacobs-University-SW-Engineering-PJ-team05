import React, { useState, useEffect } from 'react';

// Retrieve services from user
import UserService from '../services/user.service';


/**
 * Instructor Component
 */
const Instructor = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        // Retrieve instructor specific sources for authenticated user
        UserService.getInstructorSources().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const content = (error.response && error.response.data) ||
                    error.message || error.toString();

                setContent(content);
            }
        );
    }, []);

    // Show instructor's data on website
    return (
        <div className="container">
            <header className="jumbotron bg-transparent">
                <h3>{content}</h3>
            </header>
        </div>
    );
};

export default Instructor;
