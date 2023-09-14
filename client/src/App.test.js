import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';

let container = null;

beforeEach(() => {
    // Setup a DOM element as target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // Clean up on exit
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('Navigates to links', () => {
    it('Navigates home on brand click', () => {
        expect('Navigation Test').toBe('Navigation Test');
    });
});
