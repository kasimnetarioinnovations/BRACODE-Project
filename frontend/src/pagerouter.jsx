// // ✅ pagerouter.jsx
// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import App from "./App";

// const router = createBrowserRouter([
//  { path: "/", element: <App /> },
//   { path: "/dashboard", element: <Dashboard /> },
// ]);

// const Pagerouter = () => {
//   return <RouterProvider router={router} />;
// };

// export default Pagerouter;


// pagerouter.jsx ✅
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import App from "./App";

const Pagerouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pagerouter;
