import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "components/Header";
import ListPage from "./pages/ListPage";
import ItemPage from "./pages/ItemPage";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";

const App = () => {
  useQueryParamsStoreInit();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path=":orgs/:name" element={<ItemPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
