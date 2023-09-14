import React from 'react';
import PropTypes from 'prop-types';

/**
 * 
* Renders a Button component
* @param  props.color - the color of the button
* @param  props.text - text of the button
* @returns {HTMLElement} Button
*/

const Button = ({ color, text }) => {
    return (
        <button onClick={onClick}
            style={{ backgroundColor: color }}
            className='btn'>
            {text}
        </button>
    );
};


Button.defaultProps = {
    color: 'steelblue'
};

Button.PropTypes = {};

export default Button;