import { Events } from "../../../modules/Events/Events";

export const EventsListPage = ({ events }) => {
  return (
    <div>
      <Events events={events} />
    </div>
  );
};
