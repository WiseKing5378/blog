import './Header.scss';

function Header() {
  return (
    <header className="header">
      <p className="header__title">Realworld Blog</p>
      <div className="header__btn-group">
        <button type="button" className="header__btn">
          Sign In
        </button>
        <button type="button" className="header__btn">
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;
