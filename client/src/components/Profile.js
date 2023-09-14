import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Renders Profile Component
 */

const Roles = ['Undefined', 'Admin', 'Instructor', 'Player']

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    // Redirect to login on unauthenticated access
    if (!currentUser) {
        return <Redirect to='/login' />;
    }

    // Show user profile on website
    return (
        <div className="container">
            <header className="jumbotron bg-transparent">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUser.access.substring(0, 20)} ...{" "}
                {currentUser.access.substr(currentUser.access.length - 20)}
            </p>
            <p>
                <strong>Id:</strong> Implementing
            </p>
            <p>
                <strong>Email:</strong> {currentUser.authenticatedUser.email}
            </p>
            <p>
                <strong>Authorities:</strong> {Roles[currentUser.authenticatedUser.role]}
            </p>
        </div>
    );
};

export default Profile;