import { useDocumentTitle } from "../../../core/hooks/useDocumentTitle";
import { Artists } from "../../../modules/Artists/Artists";

export const ArtistsListPage = () => {
  useDocumentTitle({ title: "Artists List" });
  return (
    <>
      <Artists />
    </>
  );
};
