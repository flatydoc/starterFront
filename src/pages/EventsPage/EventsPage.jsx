import { Route, Routes } from "react-router-dom";
import { AddEventPage } from "./AddEventPage/AddEventPage";
import { EditEventPage } from "./EditEventPage/EditEventPage";
import { EventsListPage } from "./EventsListPage/EventsListPage";
import { useCallback, useEffect, useState } from "react";
import { getAll } from "../../modules/Events/core/api/events";
import { EventPage } from "./EventPage/EventPage";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);

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

  return (
    <div>
      <Routes>
        <Route index path="/" element={<EventsListPage events={events} />} />
        <Route path=":eventId" element={<EventPage />} />
        <Route path=":eventId/edit" element={<EditEventPage />} />
        <Route
          path="add"
          element={<AddEventPage getAllEvents={getAllEvents} />}
        />
      </Routes>
    </div>
  );
};
