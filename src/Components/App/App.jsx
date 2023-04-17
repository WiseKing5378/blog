import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Spin } from 'antd';

import Header from '../Header';
import CardList from '../CardList';
import { fetchData } from '../../Store/CardDataSlice';

// eslint-disable-next-line no-unused-vars
import style from './App.module.scss';

function App() {
  const { status } = useSelector((state) => state.CardDataSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData(0));
  }, []);
  return (
    <>
      <Header />
      <main className={style.main}>{status === 'loading' ? <Spin size="large" /> : <CardList />}</main>
    </>
  );
}

export default App;
