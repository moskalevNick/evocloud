import React, { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './modules/Login/Login';
import { DevicesModule } from './modules/DevicesModule/DevicesModule';
import { Layout } from './modules/Layout/Layout';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { globalActions } from './redux/global/actions';
import { Loader } from './components/Loader/Loader';
import { UsersModule } from './modules/UsersModule/UsersModule';
import { WidthLimit } from './components/WidthLimit/WidthLimit';
import { IntegratorsModule } from './modules/IntegratorsModule/IntegratorsModule';
import { DistributorsModule } from './modules/DistributorsModule/DistributorsModule';

export default function App() {
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery('(min-width: 1200px)');
  const { isAuth, isLoading, isRus, role } = useAppSelector((state) => state.globalReducer);

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      dispatch(globalActions.checkAuth());
    }
  }, [dispatch, isRus]);

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

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route element={<Layout />}>
            <Route path="devices" element={<DevicesModule />} />
            {role === 'admin' && <Route path="distributors" element={<DistributorsModule />} />}
            {role === 'admin' && (
              <Route path="distributors/info/:id" element={<DistributorsModule />} />
            )}
            {(role === 'distributor' || role === 'admin') && (
              <Route path="integrators" element={<IntegratorsModule />} />
            )}
            {(role === 'distributor' || role === 'admin') && (
              <Route path="integrators/info/:id" element={<IntegratorsModule />} />
            )}
            {role !== 'user' && <Route path="users" element={<UsersModule />} />}
            {role !== 'user' && <Route path="users/info/:id" element={<UsersModule />} />}
            {role !== 'user' && <Route path="users/controllers/:id" element={<UsersModule />} />}
            {role !== 'user' && <Route path="users/widgets/:id" element={<UsersModule />} />}
            <Route path="*" element={<Navigate to="/devices" replace={true} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
