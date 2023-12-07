import { auth } from 'fb/firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkLogin } from '../src/redux/modules/authSlice';
import Router from 'shared/Router';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import { onAuthStateChanged } from '@firebase/auth';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(checkLogin(user.providerData));
    });
  }, [dispatch]);

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
