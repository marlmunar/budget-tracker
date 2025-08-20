import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";

import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound.jsx";
import LogScreen from "./pages/LogScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Loading from "./pages/Loading.jsx";
import Visualize from "./components/Visualize.jsx";
import NewTabChecker from "./components/NewTabChecker.jsx";
import Logs from "./pages/Logs.jsx";
import PageWrapper from "./components/PageWrapper.jsx";
import ModalWrapper from "./components/ModalWrapper.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CalendarView from "./components/CalendarView.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<Loading />}>
        <Route path="login" element={<Login />} />
        <Route path="register/*" element={<Register />} />
        <Route element={<ModalWrapper />}>
          <Route element={<PrivateRoute />}>
            <Route element={<NewTabChecker />}>
              <Route path="log/:logId/view?" element={<LogScreen />} />
            </Route>
          </Route>
          <Route element={<PageWrapper />}>
            <Route index element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="logs" element={<Logs />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
