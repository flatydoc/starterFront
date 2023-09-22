import { useNavigate } from "react-router-dom";

export const EventsList = ({ events }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/events/${id}`, { state: { id } });
  };

  return (
    <>
      {events.map((event, i) => (
        <div key={event.id}>
          <div>{event.title}</div>
          <button onClick={() => handleClick(event.id)}>edit</button>
        </div>
      ))}
    </>
  );
};
