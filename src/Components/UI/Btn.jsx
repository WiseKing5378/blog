/* eslint-disable react/destructuring-assignment */
import './Btn.scss';
import PropTypes from 'prop-types';

function Btn(props) {
  const { clas, fn } = props;
  return (
    <button type="button" className={clas} onClick={fn}>
      {props.children}
    </button>
  );
}
Btn.propTypes = {
  fn: PropTypes.func,
  clas: PropTypes.string,
};
Btn.defaultProps = { clas: '', fn: () => {} };
export default Btn;
