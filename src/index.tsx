import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppState from 'state';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: process.env.REACT_APP_API,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <AppState>
    <ApolloProvider client={client}>
      <App />
      </ApolloProvider>
    </AppState>
);


