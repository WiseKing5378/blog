/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import uuid from 'react-uuid';

import style from './Form.module.scss';

export default function Form(props) {
  const dispatch = useDispatch();
  const { fn, title, btnText, formType, inputField } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  let footer = null;
  if (formType === 'signIn') {
    footer = (
      <p className={style.form__subtilte}>
        Dont have an account?&nbsp; <Link to="/sign-up">Sign up</Link>
      </p>
    );
  }
  if (formType === 'signUp') {
    footer = (
      <p className={style.form__subtilte}>
        Already have an account?&nbsp; <Link to="/sign-in">Sign in</Link>
      </p>
    );
  }

  const onSubmit = (e) => {
    console.log(e);
  };
  const usernameRules = {
    required: 'Required to fill in',
    minLength: {
      value: 3,
      message: 'Minimum of 3 characters',
    },
    maxLength: { value: 20, message: 'Maximum of 20 characters' },
  };
  const passwordRules = {
    required: 'Required to fill in',
    minLength: {
      value: 6,
      message: 'Minimum of 6 characters',
    },
    maxLength: { value: 40, message: 'Maximum of 40 characters' },
  };
  const emailRules = {
    required: 'Required to fill in',
    pattern: {
      value:
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
      message: 'Email format like be email@em.em',
    },
  };

  const inputs = inputField.map((i) => {
    const { label, name, type } = i;
    let validate;
    if (name === 'username') validate = usernameRules;
    if (name === 'password' || name === 'confirmPassword') validate = passwordRules;
    if (name === 'email') validate = emailRules;
    return (
      <label htmlFor={uuid()} key={uuid()} className={style.label}>
        {label}
        <input type={type} {...register(name, validate)} id={uuid()} className={style.input} placeholder={label} />
        <div style={{ color: 'rgba(245, 34, 45, 1)' }}>{errors[name] ? <p>{errors[name].message}</p> : null}</div>
      </label>
    );
  });

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={style.form__title}>{title}</h3>
      <div className={style.form__input}>{inputs}</div>

      {formType === 'signUp' ? (
        <label htmlFor="checkbox" className={style.checkbox}>
          <input type="checkbox" name="checkbox" id="checkbox" required /> I agree to the processing of my personal
          information
        </label>
      ) : null}

      <div className={style.form__footer}>
        <button type="submit" className={style.form__btn} disabled={!isValid}>
          {btnText}
        </button>
        {footer}
      </div>
    </form>
  );
}
