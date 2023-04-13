import { Pagination } from 'antd';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';

import CardItem from '../CardItem';

import style from './CardList.module.scss';

function CardList() {
  const { cardData, articlesCount } = useSelector((state) => state.CardDataSlice);
  console.log(cardData);
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
      {data}
      <Pagination
        defaultCurrent={1}
        total={articlesCount}
        showSizeChanger=""
        // onChange={}
        // current={}
        defaultPageSize="20"
        hideOnSinglePage
      />
    </ul>
  );
}

export default CardList;
