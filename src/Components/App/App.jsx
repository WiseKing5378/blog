import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginIn from '../Login';
import Header from '../Header';
import CardList from '../CardList';
import { fetchData } from '../../Store/Articles';
import SignUp from '../SignUp';
import { getCurrentUser } from '../../Store/Authentication';
import ProfileEdit from '../ProfileEdit';
import CreateArticle from '../Article/CreateArticle';
import EditArticle from '../Article/EditArticle';
import Article from '../Article/Article';
import SuccessPage from '../UI/SuccessPage';

import './App.scss';

function App() {
  const dispatch = useDispatch();
  const { login, user } = useSelector((state) => state.User);
  const { currentArticle } = useSelector((state) => state.Articles);
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
        <Route path="/profile" Component={login ? ProfileEdit : LoginIn} />
        <Route path="/new-article" Component={login ? CreateArticle : LoginIn} />
        <Route
          path="/articles/:id/edit"
          Component={user.username === currentArticle.author.username && login ? EditArticle : Article}
        />
        <Route path="/articles/:id" Component={Article} />
        <Route path="/success" Component={SuccessPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
