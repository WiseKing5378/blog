/* eslint-disable react/destructuring-assignment */
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import style from './Form.module.scss';

export default function Form(props) {
  const dispatch = useDispatch();
  const { fn, title, btnText } = props;
  return (
    <form className={style.form}>
      <h3 className={style.form__title}>{title}</h3>
      <div className={style.form__input}>{props.children}</div>
      <div className={style.form__footer}>
        <button
          type="submit"
          className={style.form__btn}
          onClick={(e) => {
            e.preventDefault();
            dispatch(fn());
          }}
        >
          <Link to="/" style={{ color: 'rgba(255, 255, 255, 1)' }}>
            {btnText}
          </Link>
        </button>
        <p className={style.form__subtilte}>
          Dont have an account? <Link to="/sign-up">Sign up</Link>
        </p>
      </div>
    </form>
  );
}
