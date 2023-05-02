/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import inputRules from '../../InputValidationRules/Rules';

import Input from './Input';
import style from './Form.module.scss';

function Form(props) {
  const dispatch = useDispatch();
  const { fn, title, btnText, formType } = props;
  const { status, user } = useSelector((state) => state.User);
  const navigate = useNavigate();
  const { usernameRules, passwordRules, emailRules, urlRules } = inputRules;

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

  const footer =
    formType === 'edit' ? null : (
      <p className={style.form__subtilte}>
        {formType === 'signIn' ? 'Dont have an account?' : 'Already have an account?'}&nbsp;
        <Link to={formType === 'signIn' ? '/sign-up' : '/sign-in'}>
          {formType === 'signIn' ? 'Sign Up' : 'Sign In'}
        </Link>
      </p>
    );

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={style.form__title}>{title}</h3>
      <div className={style.form__input}>
        <div style={{ color: 'rgba(245, 34, 45, 1)' }}>{status === 'error' && error}</div>

        <Input
          defaultValue={formType === 'edit' ? user.email : null}
          title="Email address"
          name="email"
          type="email"
          register={{ ...register('email', { ...emailRules }) }}
          errors={errors.email ? <p>{errors.email.message}</p> : null}
        />

        {formType === 'signUp' || formType === 'edit' ? (
          <Input
            defaultValue={formType === 'edit' ? user.username : null}
            title="Username"
            name="username"
            type="text"
            register={{ ...register('username', { ...usernameRules }) }}
            errors={errors.username ? <p>{errors.username.message}</p> : null}
          />
        ) : null}

        {formType === 'edit' ? (
          <Input
            title="Avatar image (url)"
            name="image"
            type="url"
            register={{ ...register('image', { ...urlRules }) }}
            errors={errors.image ? <p>{errors.image.message}</p> : null}
          />
        ) : null}

        <Input
          title="Password"
          name="password"
          type="password"
          register={{ ...register('password', { ...passwordRules }) }}
          errors={errors.password ? <p>{errors.password.message}</p> : status !== 'error' && error}
        />

        {formType === 'signUp' ? (
          <Input
            title="Repeat password"
            name="confirmPassword"
            type="password"
            register={{ ...register('confirmPassword', { ...passwordRules }) }}
            errors={errors.confirmPassword ? <p>{errors.confirmPassword.message}</p> : status !== 'error' && error}
          />
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

Form.propTypes = {
  fn: PropTypes.func,
  title: PropTypes.string,
  btnText: PropTypes.string,
  formType: PropTypes.string,
};
Form.defaultProps = { fn: () => {}, title: '', btnText: '', formType: '' };

export default Form;
