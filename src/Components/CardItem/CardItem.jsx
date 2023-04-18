/* eslint-disable no-unused-vars */
import { Space, Tag } from 'antd';
import uuid from 'react-uuid';
import { format } from 'date-fns';

import avt from '../../Assets/avatar.png';

import style from './CardItem.module.scss';

function CardItem(props) {
  const { title, description, body, updatedAt, tagList, author } = props;
  const tags = tagList.map((i) => <Tag key={uuid()}>{i}</Tag>);
  return (
    <li className={style.card}>
      <div className={style.card__info}>
        <h3 className={style.card__title}>{title}</h3>
        <Space size={[0, 8]} wrap className={style.card__tag}>
          {tags}
        </Space>
        <p className={style.card__text}>{description}</p>
        {/* <div className={style.card__article}>{body}</div> */}
      </div>
      <div className={style.card__author}>
        <div>
          <p className={style.card__author_username}>{author.username}</p>
          <span className={style.card__author_date}>{format(new Date(updatedAt), 'PP')}</span>
        </div>
        <img className={style.card__author_img} src={author.image ? author.image : avt} alt="avatar" />
      </div>
    </li>
  );
}

export default CardItem;
