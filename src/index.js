import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthProvider from './Store/AuthProvider';
import ItemProvider from './Store/ItemProvider';

import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <ItemProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ItemProvider>
    </AuthProvider>
);
