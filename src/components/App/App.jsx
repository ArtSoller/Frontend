import React from "react";

import Header from "./Header";
import AppRoutes from "./AppRoutes";

import "../../styles/index.css";
const App = () => (
    <div className="app">
        <Header />
        <AppRoutes />
    </div>
);

export default App;