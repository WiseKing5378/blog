import { Pagination, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';

import { changePage, fetchData } from '../../Store/Articles';
import CardItem from '../CardItem';

import style from './CardList.module.scss';

function CardList() {
  const dispatch = useDispatch();
  const { cardData, articlesCount, offset, status } = useSelector((state) => state.Articles);
  const data = cardData.map((i) => {
    const { title, description, updatedAt, tagList, author, slug, favoritesCount, favorited } = i;
    return (
      <CardItem
        key={uuid()}
        title={title}
        description={description}
        updatedAt={updatedAt}
        tagList={tagList}
        author={author}
        slug={slug}
        favoritesCount={favoritesCount}
        favorited={favorited}
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
          dispatch(fetchData(e * 5 - 5));
        }}
        current={(offset + 5) / 5}
        defaultPageSize="5"
        hideOnSinglePage
      />
    </ul>
  );
}

export default CardList;
