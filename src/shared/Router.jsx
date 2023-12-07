import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from 'pages/Home';
import FestivalRegistration from 'pages/FestivalRegistration/FestivalRegistration';
import Detail from 'pages/Home/Detail';
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<FestivalRegistration />} />
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
