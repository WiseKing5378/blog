/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginIn from '../Login';
import Header from '../Header';
import CardList from '../CardList';
import { fetchData } from '../../Store/Articles';
import SignUp from '../SignUp';
import { getCurrentUser } from '../../Store/Authentication';
import ProfileEdit from '../ProfileEdit';
import CreateArticle from '../CreateArticle/CreateArticle';

import style from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem('token'));
  useEffect(() => {
    if (token) dispatch(getCurrentUser(token));

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
        <Route path="/new-article" Component={CreateArticle} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
