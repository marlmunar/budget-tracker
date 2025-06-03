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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      {/* <Route element={<PrivateRoute />}> */}

      <Route element={<Loading />}>
        <Route path="profile" element={<Profile />} />
        <Route path="log/:logId" element={<LogScreen />} />
        <Route index={true} path="/" element={<Home />} />
      </Route>

      {/* </Route> */}
      <Route path="*" element={<NotFound />} />
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
