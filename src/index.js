import React from 'react';
import ReactDOM from 'react-dom/client';
import Store from './Store/Index';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={Store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
    </Provider>
);
