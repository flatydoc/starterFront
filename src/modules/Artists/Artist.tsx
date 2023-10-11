import { useState, useEffect, useCallback } from "react";
import { NavLink, useParams } from "react-router-dom";
import { get, subscribe } from "./core/api/artists.js";

import { AuthContext } from "../../core/context/AuthContext.js";
import { useContext } from "react";
import { ArtistInfo } from "./components/ArtistInfo.jsx";
import { IArtist } from "types/index.js";

export const Artist = () => {
  const [artist, setArtist] = useState<IArtist>();

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

  const subscribeToArtist = async () => {
    const data = {
      id: artistId,
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
      {user?.isAdmin && (
        <NavLink to={`/artists/${artistId}/edit`}>Edit</NavLink>
      )}
      <ArtistInfo artist={artist} subscribeToArtist={subscribeToArtist} />
    </div>
  );
};
