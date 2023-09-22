import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { get, subscribe } from "./core/api/events.js";

import { EventInfo } from "./components/EventInfo";

export const Event = () => {
  const [event, setEvent] = useState();

  const { eventId } = useParams();

  const getEvent = useCallback(async () => {
    await get(eventId)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [eventId]);

  useEffect(() => {
    getEvent();
  }, [getEvent]);

  const subscribeToEvent = async () => {
    const data = {
      id: eventId,
    };
    try {
      await subscribe(data).then(() => {
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <EventInfo event={event} subscribeToEvent={subscribeToEvent} />
    </div>
  );
};
