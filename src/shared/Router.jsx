import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from 'pages/Home';
import FestivalRegistration from 'pages/FestivalRegistration/FestivalRegistration';
import Search from 'pages/Search/Search';
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/registration" element={<FestivalRegistration />} />
      </Routes>
      </BrowserRouter>
  );
}
