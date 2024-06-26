import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SingleTest from './routes/SingleTest.jsx'
import Benchmark from './routes/Benchmark.jsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/single-test",
        element: <SingleTest />
    },
    {
        path: "/benchmark",
        element: <Benchmark />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
