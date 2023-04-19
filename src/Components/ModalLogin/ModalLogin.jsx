// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';

import style from './ModalLogin.module.scss';

function ModalLogin() {
  return (
    <form className={style.login}>
      <h3 className={style.login__title}>Sign In</h3>
      <div className={style.login__input}>
        <label htmlFor="email">
          Email address <input type="email" id="email" placeholder="Email address" />
        </label>
        <label htmlFor="password">
          Password <input id="password" type="password" placeholder="Password" />
        </label>
      </div>
      <div className={style.login__footer}>
        <button type="submit" className={style.login__btn}>
          Login
        </button>
        <p className={style.login__subtilte}>
          Dont have an account? <Link to="/sign-up"> Sign up</Link>
        </p>
      </div>
    </form>
  );
}

export default ModalLogin;
