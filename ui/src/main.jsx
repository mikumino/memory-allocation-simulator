import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Benchmark from './routes/Benchmark.jsx'
import Navbar from './components/Navbar.jsx'
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
        path: "/benchmark",
        element: <Benchmark />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
