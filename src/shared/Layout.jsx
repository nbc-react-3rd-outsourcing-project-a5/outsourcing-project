import Footer from 'components/Footer';
import Header from 'components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
function Layout() {
  return (
    <>
      <Header />
      <StMain>
        <Outlet />
      </StMain>
      <Footer />
    </>
  );
}

const StMain = styled.main`
  margin-top: 66px;
`;

export default Layout;
