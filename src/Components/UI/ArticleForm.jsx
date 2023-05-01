/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-props-no-spreading */

import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import style from './ArticleForm.module.scss';

function ArticleForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, fn, formType } = props;
  const { status, currentArticle } = useSelector((state) => state.Articles);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { tagList: formType === 'edit' ? currentArticle.tagList : [] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  useEffect(() => {
    if (status === 'create') {
      navigate('/success', { replace: true });
    }
  }, [status]);

  const onSubmit = (e) => {
    if (formType === 'edit') dispatch(fn({ article: { ...e }, slug: currentArticle.slug }));
    dispatch(fn(e));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={style.form__title}>{title}</h3>
      <div className={style.form__input}>
        <label htmlFor="title" className={style.label}>
          Title
          <input
            defaultValue={formType === 'edit' ? currentArticle.title : null}
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
            defaultValue={formType === 'edit' ? currentArticle.description : null}
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
        <label htmlFor="body" className={style.label}>
          Text
          <textarea
            defaultValue={formType === 'edit' ? currentArticle.body : null}
            {...register('body', { required: 'Required to fill in' })}
            id="body"
            style={{ height: '186px', resize: 'none' }}
            className={style.input}
            placeholder="Text"
          />
          <div style={{ color: 'rgba(245, 34, 45, 1)' }}>{errors.body ? <p>{errors.body.message}</p> : null}</div>
        </label>

        <div className={style.form__tagList}>
          <ul>
            {fields.map((item, index) => (
              <li key={item.id} className={style.form__tag}>
                <input
                  className={style.input}
                  placeholder="Tag"
                  {...register(`tagList.${index}`, { required: true })}
                />

                <button className={`${style.btn} ${style.btn_red}`} type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            className={`${style.btn} ${style.btn_blue} ${style.btn_bottom}`}
            type="button"
            onClick={() => append()}
          >
            Add tag
          </button>
        </div>
      </div>

      <div className={style.form__footer}>
        <button type="submit" className={style.form__btn} disabled={!isValid}>
          Send
        </button>
      </div>
    </form>
  );
}

ArticleForm.propTypes = {
  title: PropTypes.string,
  fn: PropTypes.func,
  formType: PropTypes.string,
};
ArticleForm.defaultProps = { title: '', fn: () => {}, formType: '' };

export default ArticleForm;
