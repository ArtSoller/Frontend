import React from "react";

import "../../styles/index.css";
import Test from "../../store/Test";
import {BrowserRouter, Route, Routes} from "react-router-dom";
function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/test" element={<Test />} />
        </Routes>
    </BrowserRouter>
);
}

export default App;