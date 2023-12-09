import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getUsers, __targetUser } from '../src/redux/modules/authSlice';
import Router from 'shared/Router';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';

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
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
