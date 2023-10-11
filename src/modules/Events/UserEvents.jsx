import { EventsList } from "./components/EventsList";

import { useCallback, useEffect, useState } from "react";

import { getEventsByUserId } from "./core/api/events.js";

export const UserEvents = () => {
  const [events, setEvents] = useState([]);

  const getAllEvents = useCallback(async () => {
    await getEventsByUserId()
      .then((res) => {
        setEvents(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  return (
    <div>
      <EventsList events={events} />
    </div>
  );
};
