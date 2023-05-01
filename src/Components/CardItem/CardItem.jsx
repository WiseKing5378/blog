import { Space, Tag } from 'antd';
import uuid from 'react-uuid';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { likeArticle, dislikeArticle, getArticle } from '../../Store/Articles';
import like from '../../Assets/like.png';
import dislike from '../../Assets/dislike.png';
import avt from '../../Assets/avatar.png';

import style from './CardItem.module.scss';

function CardItem(props) {
  const { login } = useSelector((state) => state.User);
  const { title, description, updatedAt, tagList, author, slug, favoritesCount, favorited } = props;
  const tags = tagList.map((i) => <Tag key={uuid()}>{i}</Tag>);
  const dispatch = useDispatch();

  const [likesCount, setLikesCount] = useState(favoritesCount);
  const [liked, setLiked] = useState(favorited);

  return (
    <li className={style.card}>
      <div className={style.card__info}>
        <div className={style.card__title_sec}>
          <Link
            onClick={() => {
              dispatch(getArticle(slug));
            }}
            state={{ favoritesCount: likesCount, favorited: liked }}
            to={`/articles/${slug}`}
          >
            <h3 className={style.card__title}>{title}</h3>
          </Link>
          <button
            disabled={!login}
            onClick={() => {
              if (liked) {
                setLikesCount(likesCount - 1);
                dispatch(dislikeArticle(slug));
              } else {
                setLikesCount(likesCount + 1);
                dispatch(likeArticle(slug));
              }
              setLiked(!liked);
            }}
            className={style.btn_like}
            type="button"
          >
            <img src={liked ? like : dislike} alt="like" />
            {likesCount}
          </button>
        </div>

        <Space size={[0, 8]} wrap className={style.card__tag}>
          {tags}
        </Space>
        <p className={style.card__text}>{description}</p>
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
CardItem.defaultProps = {
  title: '',
  description: '',
  updatedAt: '',
  author: '',
  slug: '',
  favoritesCount: 0,
  favorited: false,
  tagList: [],
};
CardItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  updatedAt: PropTypes.string,
  tagList: PropTypes.arrayOf(PropTypes.string),
  author: PropTypes.string,
  slug: PropTypes.string,
  favoritesCount: PropTypes.number,
  favorited: PropTypes.bool,
};

export default CardItem;
