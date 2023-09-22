import { EventsList } from "./components/EventsList";

export const Events = ({ events }) => {
  return (
    <div>
      <EventsList events={events} />
    </div>
  );
};
