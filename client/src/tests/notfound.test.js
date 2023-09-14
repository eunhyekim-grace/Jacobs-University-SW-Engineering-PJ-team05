import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import NotFound from '../components/NotFound';

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

describe('Renders Not Found page content', () => {
    it('Renders not found text', () => {
        act(() => {
            render(<NotFound />, container);
        });
        expect(container.textContent).toBe('Oops, not found!');
    });
});