/* eslint-disable react/destructuring-assignment */
import './Btn.scss';
import PropTypes from 'prop-types';

function Btn(props) {
  const { clas } = props;
  return (
    <button type="button" className={clas}>
      {props.children}
    </button>
  );
}
Btn.propTypes = {
  clas: PropTypes.string,
};
Btn.defaultProps = { clas: '' };
export default Btn;
