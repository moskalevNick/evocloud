import React, { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { Login } from './modules/Login/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DevicesModule } from './modules/DevicesModule/DevicesModule';
import { Layout } from './modules/Layout/Layout';
import { FullscreenCamera } from './components/FullscreenCamera/FullscreenCamera';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { globalActions } from './redux/global/actions';
import { Loader } from './components/Loader/Loader';
import { Founder } from './containers/Founder';
import { Registration } from './modules/Registration/Registration';
import { UsersModule } from './modules/UsersModule/UsersModule';
import { WidthLimit } from './components/WidthLimit/WidthLimit';

export default function App() {
  const dispatch = useAppDispatch();
  // const isOpenFullScreenCamera = useAppSelector(
  //   (state) => state.globalReducer.isFullScreenCameraOpen,
  // );
  const isDesktop = useMediaQuery('(min-width: 1200px)');
  const { isAuth, isLoading, role } = useAppSelector((state) => state.globalReducer);

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      dispatch(globalActions.checkAuth());
    }
  }, [dispatch]);

  useEffect(() => {
    console.log(isDesktop);
  }, [isDesktop]);

  if (!isDesktop) {
    return <WidthLimit />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuth) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // if (role === 'admin') {
  //   return (
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/registration" element={<Registration />} />
  //         <Route path="*" element={<Navigate to="/registration" replace={true} />} />
  //       </Routes>
  //     </BrowserRouter>
  //   );
  // }

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route element={<Layout />}>
            <Route path="devices" element={<DevicesModule />} />
            <Route path="users" element={<UsersModule />} />
            <Route path="users/:id" element={<UsersModule />} />
            <Route path="*" element={<Navigate to="/devices" replace={true} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
