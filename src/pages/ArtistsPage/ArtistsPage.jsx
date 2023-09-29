import { Route, Routes } from "react-router-dom";

import { EditArtistPage } from "./EditArtistPage/EditArtistPage.jsx";
import { ArtistPage } from "./ArtistPage/ArtistPage.jsx";
import { ArtistsListPage } from "./ArtistsListPage/ArtistsListPage.jsx";
import { AddArtistPage } from "./AddArtistPage/AddArtistPage.jsx";

export const ArtistsPage = () => {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<ArtistsListPage />} />
        <Route path=":artistId" element={<ArtistPage />} />
        <Route path=":artistId/edit" element={<EditArtistPage />} />
        <Route path="add" element={<AddArtistPage />} />
      </Routes>
    </div>
  );
};
