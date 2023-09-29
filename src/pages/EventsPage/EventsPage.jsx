import { Route, Routes } from "react-router-dom";
import { AddEventPage } from "./AddEventPage/AddEventPage";
import { EditEventPage } from "./EditEventPage/EditEventPage";
import { EventsListPage } from "./EventsListPage/EventsListPage";

import { EventPage } from "./EventPage/EventPage";

export const EventsPage = () => {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<EventsListPage />} />
        <Route path=":eventId" element={<EventPage />} />
        <Route path=":eventId/edit" element={<EditEventPage />} />
        <Route path="add" element={<AddEventPage />} />
      </Routes>
    </div>
  );
};
