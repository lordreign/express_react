import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route, 
} from 'react-router-dom';

import * as views from './views';

// layouts
import MainLayout from './layouts/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<views.BoardIndex />} />
          <Route path="boards" element={<views.BoardIndex />} />
          <Route path="boards/:id" element={<views.BoardShow />} />
          <Route path="boards/:id/edit" element={<views.BoardEdit />} />
          <Route path="boards/new" element={<views.BoardNew />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
