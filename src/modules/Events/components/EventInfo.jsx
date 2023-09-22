export const EventInfo = ({ event, subscribeToEvent }) => {
  return (
    <>
      <button onClick={subscribeToEvent}>subscribeToEvent</button>
      <p>{event && event.title}</p>
    </>
  );
};
