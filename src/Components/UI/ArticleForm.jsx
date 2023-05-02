/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-props-no-spreading */

import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import inputRules from '../../InputValidationRules/Rules';

import Input from './Input';
import Btn from './Btn';
import style from './ArticleForm.module.scss';

function ArticleForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, fn, formType } = props;
  const { status, currentArticle } = useSelector((state) => state.Articles);
  const { requiredRules } = inputRules;

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
        <Input
          defaultValue={formType === 'edit' ? currentArticle.title : null}
          title="Title"
          name="title"
          type="text"
          register={{ ...register('title', { ...requiredRules }) }}
          errors={errors.title ? <p>{errors.title.message}</p> : null}
        />
        <Input
          defaultValue={formType === 'edit' ? currentArticle.description : null}
          title="Short description"
          name="description"
          type="text"
          register={{ ...register('description', { ...requiredRules }) }}
          errors={errors.description ? <p>{errors.description.message}</p> : null}
        />

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

                <Btn clas="btn btn_red" fn={() => remove(index)}>
                  Delete
                </Btn>
              </li>
            ))}
          </ul>
          <Btn clas="btn btn_blue btn_large btn_bottom" fn={() => append()}>
            Add tag
          </Btn>
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
