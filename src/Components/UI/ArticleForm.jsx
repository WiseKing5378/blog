/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';

import style from './ArticleForm.module.scss';

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

  const onSubmit = (e) => {
    console.log(e);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={style.form__title}>{title}</h3>
      <div className={style.form__input}>
        <label htmlFor="text" className={style.label}>
          Title
          <input
            type="text"
            {...register('text', { required: 'Required to fill in' })}
            id="text"
            className={style.input}
            placeholder="Title"
          />
          <div style={{ color: 'rgba(245, 34, 45, 1)' }}>
            {errors.password ? <p>{errors.password.message}</p> : null}
          </div>
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
            {errors.password ? <p>{errors.password.message}</p> : null}
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
          <div style={{ color: 'rgba(245, 34, 45, 1)' }}>
            {errors.password ? <p>{errors.password.message}</p> : null}
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
