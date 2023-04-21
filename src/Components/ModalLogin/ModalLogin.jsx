// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from '../UI/Input';
import { loginUser } from '../../Store/Authentication';

import style from './ModalLogin.module.scss';

function ModalLogin() {
  const dispatch = useDispatch();
  return (
    <form className={style.login}>
      <h3 className={style.login__title}>Sign In</h3>
      <div className={style.login__input}>
        <Input label="Email address" type="email" id="email" />
        <Input label="Password" type="password" id="password1" />
      </div>
      <div className={style.login__footer}>
        <button
          type="submit"
          className={style.login__btn}
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              loginUser({
                email: 'jrt@kkl.lkk',
                password: '895jrty',
              })
            );
          }}
        >
          <Link to="/" style={{ color: 'rgba(255, 255, 255, 1)' }}>
            Login
          </Link>
        </button>
        <p className={style.login__subtilte}>
          Dont have an account? <Link to="/sign-up">Sign up</Link>
        </p>
      </div>
    </form>
  );
}

export default ModalLogin;
