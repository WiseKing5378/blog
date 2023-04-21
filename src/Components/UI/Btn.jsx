/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import './Btn.scss';

export default function Btn(props) {
  const { clas } = props;
  return (
    <button type="button" className={clas}>
      {props.children}
    </button>
  );
}
