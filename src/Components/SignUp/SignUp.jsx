// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';

import style from './SignUp.module.scss';

function SignUp() {
  return (
    <form className={style.login}>
      <h3 className={style.login__title}>Sign Up</h3>
      <div className={style.login__input}>
        <label htmlFor="username">
          Username <input type="text" id="username" placeholder="Username" required />
        </label>
        <label htmlFor="email">
          Email address <input type="email" id="email" placeholder="Email address" required />
        </label>
        <label htmlFor="password">
          Password <input id="password" type="password" placeholder="Password" required />
        </label>
        <label htmlFor="password">
          Repeat password <input id="password" type="password" placeholder="Repeat password" required />
        </label>
      </div>
      <label htmlFor="checkbox" className={style.checkbox}>
        <input type="checkbox" name="checkbox" id="checkbox" required /> I agree to the processing of my personal
        information
      </label>

      <div className={style.login__footer}>
        <button type="submit" className={style.login__btn}>
          Create
        </button>
        <p className={style.login__subtilte}>
          Already have an account? <Link to="/sign-in"> Sign in</Link>
        </p>
      </div>
    </form>
  );
}

export default SignUp;
