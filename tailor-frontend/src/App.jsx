import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      
      <div className="text-center bg-white p-10 rounded shadow-md w-[400px]">

        <h1 className="text-3xl font-bold text-blue-600">
          Tailor Management System
        </h1>

        <p className="mt-3 text-gray-600">
          React + ASP.NET Core Web API Project
        </p>

        <div className="mt-5 space-y-2">
          <p>✔ Customers Management</p>
          <p>✔ Tailors Management</p>
          <p>✔ Orders System</p>
          <p>✔ Measurements</p>
        </div>

        <button
          className="mt-5 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => window.location.href = "/dashboard"}
        >
          Go to Dashboard
        </button>

      </div>

    </div>
  );
}

export default App;