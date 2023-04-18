import { Pagination, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';

import { changePage, fetchData } from '../../Store/CardDataSlice';
import CardItem from '../CardItem';

import style from './CardList.module.scss';

function CardList() {
  const dispatch = useDispatch();
  const { cardData, articlesCount, offset, status } = useSelector((state) => state.CardDataSlice);
  const data = cardData.map((i) => {
    const { title, description, body, updatedAt, tagList, author } = i;
    return (
      <CardItem
        key={uuid()}
        title={title}
        description={description}
        body={body}
        updatedAt={updatedAt}
        tagList={tagList}
        author={author}
      />
    );
  });
  return (
    <ul className={style.card_list}>
      {status === 'loading' ? <Spin size="large" /> : data}

      <Pagination
        defaultCurrent={1}
        total={articlesCount}
        showSizeChanger=""
        onChange={(e) => {
          dispatch(changePage(e));
          dispatch(fetchData(offset));
        }}
        current={(offset + 5) / 5}
        defaultPageSize="5"
        hideOnSinglePage
      />
    </ul>
  );
}

export default CardList;
