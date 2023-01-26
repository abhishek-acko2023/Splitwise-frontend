import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

// CSS
import "./index.css";

// App
import App from "./Components/App/App";

// React-Router
import { BrowserRouter as Router } from "react-router-dom";

// React-Helmet
import { HelmetProvider } from "react-helmet-async";

// snack bar provider
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <SnackbarProvider autoHideDuration={5000}>
          <App />
        </SnackbarProvider>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);
reportWebVitals();
