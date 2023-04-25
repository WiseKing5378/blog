/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import uuid from 'react-uuid';

import Btn from './Btn';
import style from './ArticleForm.module.scss';

function Tag(props) {
  const { register, name, fn } = props;
  return (
    <div>
      <input type="text" {...register(`${name}`)} id="tags" className={style.input} placeholder="Tag" />
      <button
        onClick={(e) => {
          console.log(e.target.parentElement);
        }}
        type="button"
        style={{ width: '80px' }}
        className='"btn btn_large btn_red"'
      >
        Delete
      </button>
    </div>
  );
}

export default function ArticleForm(props) {
  const { title } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const [tagList, setTagList] = useState([]);
  let tagName = 1;

  const onSubmit = (e) => {
    const res = Object.entries(e).reduce(
      (acc, i) => {
        if (i[0] === 'title' || i[0] === 'description' || i[0] === 'text') {
          acc[i[0]] = i[1];
        } else if (i[1]) {
          acc.tags = [...acc.tags, i[1]];
        }
        return acc;
      },
      { tags: [] }
    );

    console.log(res);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={style.form__title}>{title}</h3>
      <div className={style.form__input}>
        <label htmlFor="title" className={style.label}>
          Title
          <input
            type="text"
            {...register('title', { required: 'Required to fill in' })}
            id="title"
            className={style.input}
            placeholder="Title"
          />
          <div style={{ color: 'rgba(245, 34, 45, 1)' }}>{errors.title ? <p>{errors.title.message}</p> : null}</div>
        </label>
        <label htmlFor="description" className={style.label}>
          Short description
          <input
            type="text"
            {...register('description', { required: 'Required to fill in' })}
            id="description"
            className={style.input}
            placeholder="Short description"
          />
          <div style={{ color: 'rgba(245, 34, 45, 1)' }}>
            {errors.description ? <p>{errors.description.message}</p> : null}
          </div>
        </label>
        <label htmlFor="text" className={style.label}>
          Text
          <textarea
            {...register('text', { required: 'Required to fill in' })}
            id="text"
            style={{ height: '186px', resize: 'none' }}
            className={style.input}
            placeholder="Text"
          />
          <div style={{ color: 'rgba(245, 34, 45, 1)' }}>{errors.text ? <p>{errors.text.message}</p> : null}</div>
        </label>

        <label htmlFor="tags" className={style.label}>
          Tags
          <div className={style.form__tags}>
            {tagList}
            <button
              type="button"
              onClick={() => {
                tagName += 1;
                setTagList(tagList.concat(<Tag register={register} name={uuid()} key={uuid()} fn={setTagList} />));
                console.log(tagList);
              }}
            >
              btn
            </button>
            {/* <Btn clas="btn btn_large btn_blue">Add</Btn> */}
          </div>
        </label>
      </div>

      <div className={style.form__footer}>
        <button type="submit" className={style.form__btn} disabled={!isValid}>
          Send
        </button>
      </div>
    </form>
  );
}
