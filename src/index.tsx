import React from "react";
import reportWebVitals from "./reportWebVitals";

import {Provider} from "react-redux";
import ReactDOM from 'react-dom/client';

import App from './components/App/App';
import {store} from "./store/store";
import AppRoutes from "./components/App/AppRoutes";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
reportWebVitals();