import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/shared/Loading';
import routes from './routes/routes';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element/>} />
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;