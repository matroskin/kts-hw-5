import React, { Suspense } from 'react';
import { observer } from 'mobx-react-lite';
import { Routes, Route } from 'react-router-dom';
import rootStore from 'store/RootStore/instatnce';
import Header from 'components/Header';
import ListPage from './pages/ListPage';
import ItemPage from './pages/ItemPage';
import NotFoundPage from './pages/NotFoundPage';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';
import styles from './App.module.scss';

const App = () => {
  useQueryParamsStoreInit();

  return (
    <div className={`${styles.app} ${rootStore.theme.theme}`}>
      <Suspense fallback="">
        <Header />
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path=":orgs/:name" element={<ItemPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default observer(App);
