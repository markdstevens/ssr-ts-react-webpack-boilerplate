import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { App } from 'components/App';

// @ts-ignore
const data = window.__INITIAL_STATE__;

hydrate(
    <BrowserRouter>
        <App data={data} />
    </BrowserRouter>,
    document.getElementById('app')
)
