import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './features/signup';
import SignIn from './features/signin';
import Home from './pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div className="notFound">404 NOT FOUND :(</div>,
    children: [
      {
        element: <SignUp />,
        index: true,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'home',
        element: <Home />,
      },
    ],
  },
]);

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
