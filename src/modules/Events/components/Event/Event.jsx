import styles from "./Event.module.scss";

export const Event = ({ id, title, text, data, place, price, handleClick }) => {
  return (
    <div className={styles.event} onClick={() => handleClick(id)}>
      {title}
    </div>
  );
};
