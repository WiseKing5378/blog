/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';

import style from './Form.module.scss';

export default function Form(props) {
  const { title, subtitle } = props;
  return (
    <form className={style.form}>
      <h3 className={style.form__title}>Sign In</h3>
      <div className={style.form__input}>
        <label htmlFor="email">
          Email address <input type="email" id="email" placeholder="Email address" />
        </label>
        <label htmlFor="password">
          Password <input id="password" type="password" placeholder="Password" />
        </label>
      </div>
      <div className={style.form__footer}>
        <button type="submit" className={style.form__btn}>
          Login
        </button>
        <p className={style.form__subtilte}>
          Dont have an account? <Link to="/sign-up"> Sign up</Link>
        </p>
      </div>
    </form>
  );
}
