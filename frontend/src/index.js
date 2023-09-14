import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { StrictMode } from 'react';

//routes
import Home from './page/Home';


const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />


    </Route>
  )

);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
