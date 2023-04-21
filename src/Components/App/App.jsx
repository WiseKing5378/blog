import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ModalLogin from '../ModalLogin/ModalLogin';
import Header from '../Header';
import CardList from '../CardList';
import { fetchData } from '../../Store/CardDataSlice';
import SignUp from '../SignUp';
// import { getCurrentUser } from '../../Store/Authentication';

// eslint-disable-next-line no-unused-vars
import style from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  // const { status, user } = useSelector((state) => state.User);
  useEffect(() => {
    dispatch(fetchData(0));
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" Component={CardList} />
        <Route path="/articles" Component={CardList} />
        <Route path="/sign-in" Component={ModalLogin} />
        <Route path="/sign-up" Component={SignUp} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
