import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import avatar from '../../Assets/avatar.png';
import { logout, restoreStatus } from '../../Store/Authentication';
import Btn from '../UI/Btn';
import { fetchData, changePage } from '../../Store/Articles';

import style from './Header.module.scss';

function Header() {
  const dispatch = useDispatch();
  const { login, user } = useSelector((state) => state.User);

  return (
    <header className={style.header}>
      <Link
        to="/articles"
        onClick={() => {
          dispatch(fetchData(0));
          dispatch(changePage(1));
        }}
        className={style.header__title}
      >
        Realworld Blog
      </Link>

      <div className={style.header__btn_group}>
        {login ? (
          <>
            <Link to="/new-article">
              <Btn clas="btn btn_green">Create article</Btn>
            </Link>
            <Link
              to="/profile"
              onClick={() => {
                dispatch(restoreStatus());
              }}
            >
              <Btn clas="btn btn_large btn_borderless">
                {user.username}
                <img className={style.img} src={user.image ? user.image : avatar} alt="avatar" />
              </Btn>
            </Link>

            <Link to="/" onClick={() => dispatch(logout(false))}>
              <Btn clas="btn btn_large">Log Out</Btn>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/sign-in"
              onClick={() => {
                dispatch(restoreStatus());
              }}
            >
              <Btn clas="btn btn_borderless btn_large">Sign In</Btn>
            </Link>
            <Link
              to="/sign-up"
              onClick={() => {
                dispatch(restoreStatus());
              }}
            >
              <Btn clas="btn btn_green btn_large">Sign Up</Btn>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
