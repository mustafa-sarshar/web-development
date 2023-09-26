import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css"
import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Route>
                <Route path="/*" element={<App />} />
            </Route>
        </BrowserRouter>
    </React.StrictMode>
)