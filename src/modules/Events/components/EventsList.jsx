import { useNavigate } from "react-router-dom";
import styles from "./EventsList.module.scss";
import { Event } from "./Event/Event";

export const EventsList = ({ events }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/events/${id}`, { state: { id } });
  };

  let eventElements = events?.map((e, i) => (
    <Event
      id={e.id}
      title={e.title}
      key={i}
      text={e.text}
      data={e.date}
      place={e.place}
      price={e.price}
      handleClick={handleClick}
    />
  ));

  return <div className={styles.list}>{eventElements}</div>;
};
