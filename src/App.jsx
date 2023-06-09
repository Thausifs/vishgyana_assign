import "./App.css";
import React, { Suspense } from "react";
import { lazy } from "@loadable/component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loader } from "Elements";
// import ProtectedRoute from "components/protectedRouter";
import { createBrowserHistory } from "history";

const Dashboard = lazy(() => import("pages/dashboard"));

export const history = createBrowserHistory();

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
