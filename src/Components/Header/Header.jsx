import style from './Header.module.scss';

function Header() {
  return (
    <header className={style.header}>
      <p className={style.header__title}>Realworld Blog</p>
      <div className={style.header__btn_group}>
        <button type="button" className={style.header__btn}>
          Sign In
        </button>
        <button type="button" className={style.header__btn}>
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;
