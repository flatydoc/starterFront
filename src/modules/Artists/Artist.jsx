import { useState, useEffect, useCallback } from "react";
import { NavLink, useParams } from "react-router-dom";
import { get } from "./core/api/artists.js";

import { AuthContext } from "../../core/context/AuthContext";
import { useContext } from "react";
import { ArtistInfo } from "./components/ArtistInfo.jsx";

export const Artist = () => {
  const [artist, setArtist] = useState();

  const { artistId } = useParams();
  const { user } = useContext(AuthContext);

  const getArtist = useCallback(async () => {
    await get(artistId)
      .then((res) => {
        setArtist(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [artistId]);

  useEffect(() => {
    getArtist();
  }, [getArtist]);

  return (
    <div>
      {user?.isAdmin && (
        <NavLink to={`/artists/${artistId}/edit`}>Edit</NavLink>
      )}
      <ArtistInfo artist={artist} />
    </div>
  );
};
