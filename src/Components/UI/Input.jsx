import style from './Input.module.scss';

export default function Input(props) {
  const { label, type, id } = props;
  return (
    <label htmlFor={id} className={style.label}>
      {label} <input type={type} id={id} placeholder={label} name={id} className={style.input} required />
    </label>
  );
}
