import { Space, Tag } from 'antd';

import style from './CardItem.module.scss';

function CardItem() {
  return (
    <li className={style.card}>
      <div className={style.card__info}>
        <h3 className={style.card__title}>Some article title</h3>
        <Space size={[0, 8]} wrap>
          <Tag>Tag 1</Tag>
          <Tag>Tag 2</Tag>
        </Space>
        <p className={style.card__text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </div>
      <div className={style.card__avatar}>
        <img src="" alt="avatar" />
      </div>
    </li>
  );
}

export default CardItem;
