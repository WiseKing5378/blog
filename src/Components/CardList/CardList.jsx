import { Pagination } from 'antd';

import CardItem from '../CardItem';

import style from './CardList.module.scss';

function CardList() {
  return (
    <ul className={style.card_list}>
      <CardItem />
      <Pagination defaultCurrent={1} total={50} />
    </ul>
  );
}

export default CardList;
