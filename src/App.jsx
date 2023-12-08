import { auth, db } from 'fb/firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkLogin } from '../src/redux/modules/authSlice';
import Router from 'shared/Router';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import { collection, getDocs } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const func = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'user'));
        const userProfile = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
        onAuthStateChanged(auth, (user) => {
          const userEmail = user?.providerData[0].email;
          const selectUser = userProfile.find((i) => {
            return userEmail === i.email;
          });
          dispatch(checkLogin(selectUser));
        });
      } catch (error) {
        console.error('사용자 프로필 불러오는 중 오류', error);
      }
    };
    func();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ToastContainer
          position="top-right"
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
