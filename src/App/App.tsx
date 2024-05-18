import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from 'components/Header';
import ListPage from './pages/ListPage';
import ItemPage from './pages/ItemPage';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';

const App = () => {
  useQueryParamsStoreInit();

  return (
    <div className="app">
      <Suspense fallback="">
        <Header />
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path=":orgs/:name" element={<ItemPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
