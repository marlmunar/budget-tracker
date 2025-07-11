// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { history } from "./history";
import store from "./store.js";

import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";
import LogScreen from "./pages/LogScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Loading from "./pages/Loading.jsx";
import Visualize from "./components/Visualize.jsx";
import UserSettings from "./pages/UserSettings.jsx";
import NewTabChecker from "./components/NewTabChecker.jsx";
import Logs from "./pages/Logs.jsx";
import PageWrapper from "./components/PageWrapper.jsx";
import ModalWrapper from "./components/ModalWrapper.jsx";
import CustomRouter from "./components/CustomRouter.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <CustomRouter
        navigator={history}
        location={history.location}
        navigationType={history.action}
      >
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<Login />} />
            <Route path="register/*" element={<Register />} />
            <Route element={<ModalWrapper />}>
              <Route element={<PrivateRoute />}>
                <Route element={<Loading />}>
                  <Route element={<NewTabChecker />}>
                    <Route path="visualize/:logId" element={<Visualize />} />
                    <Route path="log/:logId" element={<LogScreen />} />
                  </Route>
                </Route>
              </Route>
              <Route element={<PageWrapper />}>
                <Route index element={<Home />} />
                <Route element={<Loading />}>
                  <Route element={<PrivateRoute />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="settings" element={<UserSettings />} />
                    <Route path="logs" element={<Logs />} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </CustomRouter>
    </StrictMode>
  </Provider>
);
