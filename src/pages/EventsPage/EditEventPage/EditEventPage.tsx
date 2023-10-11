import { useDocumentTitle } from "../../../core/hooks/useDocumentTitle";
import { EditEvent } from "../../../modules/Events/EditEvent";

export const EditEventPage = () => {
  useDocumentTitle({ title: "EditTitle" });
  return (
    <>
      <EditEvent />
    </>
  );
};
