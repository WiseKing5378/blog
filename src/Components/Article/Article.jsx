/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Space, Tag, Spin } from 'antd';
import uuid from 'react-uuid';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import avt from '../../Assets/avatar.png';
import { getArticle } from '../../Store/Articles';

import style from './Article.module.scss';

function Article() {
  const { currentArticle, status } = useSelector((state) => state.Articles);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticle(id));
  }, []);

  const { title, description, author, tagList, updatedAt, body } = currentArticle;
  const tags = tagList.map((i) => <Tag key={uuid()}>{i}</Tag>);
  console.log(currentArticle);

  return (
    <div className={style.card}>
      {status === 'loading' ? (
        <Spin size="large" />
      ) : (
        <>
          <div className={style.card__info}>
            <h3 className={style.card__title}>{title}</h3>
            <Space size={[0, 8]} wrap className={style.card__tag}>
              {tags}
            </Space>
            <p className={style.card__text}>{description}</p>
            <div className={style.card__article}>
              <ReactMarkdown>{body}</ReactMarkdown>
            </div>
          </div>
          <div className={style.card__author}>
            <div>
              <p className={style.card__author_username}>{author.username}</p>
              <span className={style.card__author_date}>{format(new Date(updatedAt), 'PP')}</span>
            </div>
            <img className={style.card__author_img} src={author.image ? author.image : avt} alt="avatar" />
          </div>
        </>
      )}
    </div>
  );
}

export default Article;
