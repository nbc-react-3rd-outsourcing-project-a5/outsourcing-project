import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from 'pages/Home';
import FestivalRegistration from 'pages/FestivalRegistration/FestivalRegistration';
import Detail from 'pages/Detail/Detail';
import Search from 'pages/Search/Search';
import User from 'pages/User/User';
import Auth from 'pages/Auth/Auth';
import GenernalLogin from 'components/Auth/GenernalLogin';
import OrganizerLogin from 'components/Auth/OrganizerLogin';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="registration" element={<FestivalRegistration />} />
          <Route path="search" element={<Search />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="detail/edit/:id" element={<FestivalRegistration />} />
          <Route path="user" element={<User />} />
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
        <Route>
          <Route path="auth" element={<Auth />} />
          <Route path="auth/genernal" element={<GenernalLogin />} />
          <Route path="auth/organizer" element={<OrganizerLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
