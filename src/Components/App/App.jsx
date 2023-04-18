import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ModalLogin from '../ModalLogin/ModalLogin';
import Header from '../Header';
import CardList from '../CardList';
import { fetchData } from '../../Store/CardDataSlice';

// eslint-disable-next-line no-unused-vars
import style from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData(0));
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" Component={CardList} />
        <Route path="/articles" Component={CardList} />
        <Route path="/login" Component={ModalLogin} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
