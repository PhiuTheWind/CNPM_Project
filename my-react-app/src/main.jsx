// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { createBrowserRouter, RouterProvider, Route, } from 'react-router-dom';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App/>,
//   }
// ])

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <RouterProvider router={router}/>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global CSS
import App from './App'; // Main App component

// Create a root element and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />,
  {/* </React.StrictMode> */}
);