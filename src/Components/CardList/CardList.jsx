import CardItem from '../CardItem';

import style from './CardList.module.scss';

function CardList() {
  return (
    <ul className={style.card_list}>
      <CardItem />
    </ul>
  );
}

export default CardList;
