import { useDocumentTitle } from "../../../core/hooks/useDocumentTitle";
import { Events } from "../../../modules/Events/Events";

export const EventsListPage = () => {
  useDocumentTitle({ title: "Event List " });
  return (
    <>
      <Events />
    </>
  );
};
