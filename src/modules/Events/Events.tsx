import { EventsList } from "./components/EventsList";

import { AuthContext } from "../../core/context/AuthContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAll } from "./core/api/events.js";
import { IEvent } from "types";

export const Events = () => {
  const [events, setEvents] = useState<IEvent[]>([]);

  const getAllEvents = useCallback(async () => {
    await getAll()
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

  const { user } = useContext(AuthContext);

  return (
    <div>
      {user?.isAdmin && <NavLink to={`add`}>Add</NavLink>}
      <EventsList events={events} />
    </div>
  );
};
