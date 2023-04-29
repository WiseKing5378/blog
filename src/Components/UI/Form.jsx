/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import style from './Form.module.scss';

export default function Form(props) {
  const dispatch = useDispatch();
  const { fn, title, btnText, formType } = props;
  const { status, user } = useSelector((state) => state.User);
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  useEffect(() => {
    if (status === 'ok') {
      navigate('/', { replace: true });
    }
    if (status === 'error' && formType === 'signIn') setError('Invalid email or password');
    if (status === 'error' && formType === 'signUp') setError('An account with such data already exists');
  }, [status]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (e) => {
    delete e.confirmPassword;
    if (!error) dispatch(fn(e));
  };

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const email = watch('email');

  useEffect(() => {
    if (password !== confirmPassword && formType === 'signUp') {
      setError('Passwords must match');
    } else {
      setError('');
    }
  }, [password, confirmPassword, email]);

  const usernameRules = {
    minLength: {
      value: 3,
      message: 'Minimum of 3 characters',
    },
    maxLength: { value: 20, message: 'Maximum of 20 characters' },
  };
  const passwordRules = {
    minLength: {
      value: 6,
      message: 'Minimum of 6 characters',
    },
    maxLength: { value: 40, message: 'Maximum of 40 characters' },
  };
  const emailRules = {
    pattern: {
      value:
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
      message: 'Email format like be email@em.em',
    },
  };
  const urlRules = {
    pattern: {
      value: /^(ftp|http|https):\/\/[^ "]+$/,
      message: 'Enter correct url',
    },
  };

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

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={style.form__title}>{title}</h3>
      <div className={style.form__input}>
        <div style={{ color: 'rgba(245, 34, 45, 1)' }}>{status === 'error' && error}</div>

        <label htmlFor="email" className={style.label}>
          Email address
          <input
            defaultValue={formType === 'edit' ? user.email : null}
            type="email"
            {...register('email', { required: 'Required to fill in', ...emailRules })}
            id="email"
            className={style.input}
            placeholder="Email address"
          />
          <div style={{ color: 'rgba(245, 34, 45, 1)' }}>{errors.email ? <p>{errors.email.message}</p> : null}</div>
        </label>

        {formType === 'signUp' || formType === 'edit' ? (
          <label htmlFor="username" className={style.label}>
            Username
            <input
              defaultValue={formType === 'edit' ? user.username : null}
              type="text"
              {...register('username', { required: 'Required to fill in', ...usernameRules })}
              id="username"
              className={style.input}
              placeholder="Username"
            />
            <div style={{ color: 'rgba(245, 34, 45, 1)' }}>
              {errors.username ? <p>{errors.username.message}</p> : null}
            </div>
          </label>
        ) : null}

        {formType === 'edit' ? (
          <label htmlFor="image" className={style.label}>
            Avatar image (url)
            <input
              type="url"
              {...register('image', { required: 'Required to fill in', ...urlRules })}
              id="image"
              className={style.input}
              placeholder="Avatar image (url)"
            />
            <div style={{ color: 'rgba(245, 34, 45, 1)' }}>{errors.image ? <p>{errors.image.message}</p> : null}</div>
          </label>
        ) : null}

        <label htmlFor="password" className={style.label}>
          Password
          <input
            type="password"
            {...register('password', { required: 'Required to fill in', ...passwordRules })}
            id="password"
            className={style.input}
            placeholder="Password"
          />
          <div style={{ color: 'rgba(245, 34, 45, 1)' }}>
            {errors.password ? <p>{errors.password.message}</p> : status !== 'error' && error}
          </div>
        </label>

        {formType === 'signUp' ? (
          <label htmlFor="confirmPassword" className={style.label}>
            Repeat password
            <input
              type="password"
              {...register('confirmPassword', { required: 'Required to fill in', ...passwordRules })}
              id="confirmPassword"
              className={style.input}
              placeholder="Repeat password"
            />
            <div style={{ color: 'rgba(245, 34, 45, 1)' }}>
              {errors.confirmPassword ? <p>{errors.confirmPassword.message}</p> : status !== 'error' && error}
            </div>
          </label>
        ) : null}

        {formType === 'signUp' ? (
          <label htmlFor="checkbox" className={style.checkbox}>
            <input type="checkbox" name="checkbox" id="checkbox" required /> I agree to the processing of my personal
            information
          </label>
        ) : null}
      </div>

      <div className={style.form__footer}>
        <button type="submit" className={style.form__btn} disabled={!isValid}>
          {btnText}
        </button>
        {footer}
      </div>
    </form>
  );
}
