/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';

import style from './Input.module.scss';

function Input(props) {
  const { title, type, name, register, errors, defaultValue } = props;
  return (
    <label htmlFor="image" className={style.label}>
      {title}
      <input
        defaultValue={defaultValue}
        type={type}
        {...register}
        id={name}
        className={style.input}
        placeholder={title}
      />
      <div style={{ color: 'rgba(245, 34, 45, 1)' }}>{errors}</div>
    </label>
  );
}

Input.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
};
Input.defaultProps = { title: PropTypes.string, type: 'text', name: '', defaultValue: '' };
export default Input;
