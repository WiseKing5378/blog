// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';

import Input from '../UI/Input';

import style from './SignUp.module.scss';

function SignUp() {
  return (
    <form className={style.login} method="POST">
      <h3 className={style.login__title}>Sign Up</h3>
      <div className={style.login__input}>
        <Input label="Username" type="username" id="username" />
        <Input label="Email address" type="email" id="email" />
        <Input label="Password" type="password" id="password1" />
        <Input label="Repeat password" type="password" id="password2" />
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
