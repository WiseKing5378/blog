import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Space, Tag, Spin, Popconfirm } from 'antd';
import uuid from 'react-uuid';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import { likeArticle, dislikeArticle, getArticle, deleteArticle } from '../../Store/Articles';
import like from '../../Assets/like.png';
import dislike from '../../Assets/dislike.png';
import avt from '../../Assets/avatar.png';
import Btn from '../UI/Btn';

import style from './Article.module.scss';

function Article() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, login } = useSelector((state) => state.User);
  const { currentArticle, status } = useSelector((state) => state.Articles);
  const { title, description, author, tagList, updatedAt, body } = currentArticle;

  const [likesCount, setLikesCount] = useState(location.state?.favoritesCount);
  const [liked, setLiked] = useState(location.state?.favorited);

  useEffect(() => {
    dispatch(getArticle(id));
  }, []);

  const tags = tagList.map((i) => <Tag key={uuid()}>{i}</Tag>);
  const authorBtn = (
    <div className={style.card__author_btnSec}>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this article?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => {
          dispatch(deleteArticle(id));
          navigate('/success', { replace: true });
        }}
      >
        <button className={style.card__author_btn} type="button">
          Delete
        </button>
      </Popconfirm>
      <Btn
        clas="btn btn_green"
        fn={() => {
          navigate(`/articles/${id}/edit`, { replace: true });
        }}
      >
        Edit
      </Btn>
    </div>
  );
  function changeLike() {
    if (liked) {
      setLikesCount(likesCount - 1);
      dispatch(dislikeArticle(id));
    } else {
      setLikesCount(likesCount + 1);
      dispatch(likeArticle(id));
    }
    setLiked(!liked);
  }

  return (
    <div className={style.card}>
      {status === 'loading' ? (
        <Spin size="large" />
      ) : (
        <>
          <div className={style.card__info}>
            <div className={style.card__title_sec}>
              <h3 className={style.card__title}>{title}</h3>
              <button disabled={!login} onClick={changeLike} className={style.btn_like} type="button">
                <img src={liked ? like : dislike} alt="like" />
                {likesCount}
              </button>
            </div>

            <Space size={[0, 8]} wrap className={style.card__tag}>
              {tags}
            </Space>
            <p className={style.card__text}>{description}</p>
            <div className={style.card__article}>
              <ReactMarkdown>{body}</ReactMarkdown>
            </div>
          </div>
          <div className={style.card__author_sec}>
            <div className={style.card__author}>
              <div>
                <p className={style.card__author_username}>{author.username}</p>
                <span className={style.card__author_date}>{format(new Date(updatedAt), 'PP')}</span>
              </div>
              <img className={style.card__author_img} src={author.image ? author.image : avt} alt="avatar" />
            </div>
            {user.username === author.username ? authorBtn : null}
          </div>
        </>
      )}
    </div>
  );
}

export default Article;
