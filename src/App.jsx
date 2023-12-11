import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getUsers, __targetUser } from '../src/redux/modules/authSlice';
import Router from 'shared/Router';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading) {
      dispatch(__getUsers());
      dispatch(__targetUser());
    }
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          limit={3}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
