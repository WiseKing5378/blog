import { Link } from 'react-router-dom';

import style from './Header.module.scss';

function Header() {
  return (
    <header className={style.header}>
      <Link to="/articles" className={style.header__title}>
        Realworld Blog
      </Link>
      <div className={style.header__btn_group}>
        <Link to="/sign-in">
          <button type="button" className={style.header__btn}>
            Sign In
          </button>
        </Link>

        <button type="button" className={style.header__btn}>
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;
