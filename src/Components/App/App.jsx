/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginIn from '../Login';
import Header from '../Header';
import CardList from '../CardList';
import { fetchData } from '../../Store/CardDataSlice';
import SignUp from '../SignUp';
// import { getCurrentUser } from '../../Store/Authentication';
import ProfileEdit from '../ProfileEdit';

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
        <Route path="/sign-in" Component={LoginIn} />
        <Route path="/sign-up" Component={SignUp} />
        <Route path="/profile" Component={ProfileEdit} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
