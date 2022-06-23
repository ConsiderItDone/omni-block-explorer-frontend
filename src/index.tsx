import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { default as apolloClient } from './api/client';
import App from './App';
import './styles/index.css'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
