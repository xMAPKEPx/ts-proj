import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './pages/Main/Main';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PrivateRoute from './privateRoute';
import {store} from './redux/store'
import { Provider } from 'react-redux'
import Register from './pages/Register/Register';
import ProfilePage from "./pages/Profile/ProfilePage";
import UserProfile from "./components/UserProfile/UserProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='' element = {<PrivateRoute />}>
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Route>
      <Route path='/register' element={<Register />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
