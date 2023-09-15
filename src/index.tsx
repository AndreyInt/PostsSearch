import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "src/app/App";
import {StoreProvider} from "src/app/providers/storeProvider/ui/StoreProvider";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <StoreProvider>
                <App />
            </StoreProvider>
        </BrowserRouter>
    </React.StrictMode>
);
