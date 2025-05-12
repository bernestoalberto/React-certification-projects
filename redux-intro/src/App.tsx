import { Fragment } from 'react/jsx-runtime';
import Counter from './components/Counter.tsx';
import Auth from './components/Auth.tsx';
import Header from './components/Header.tsx';
import { useSelector } from 'react-redux';



function App() {

  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Fragment>
      <Header />
      {!isAuth && <Auth />}
      {isAuth && <Counter />}

    </Fragment>
  );
}

export default App;
