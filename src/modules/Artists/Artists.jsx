import { useCallback, useContext, useEffect, useState } from "react";
import { getAll } from "../../modules/Artists/core/api/artists";
import { NavLink } from "react-router-dom";
import { ArtistsList } from "./components/ArtistsList";
import { AuthContext } from "../../core/context/AuthContext";

export const Artists = () => {
  const [artists, setArtists] = useState([]);

  const getAllArtists = useCallback(async () => {
    await getAll()
      .then((res) => {
        setArtists(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getAllArtists();
  }, [getAllArtists]);

  const { user } = useContext(AuthContext);

  return (
    <div>
      {user?.isAdmin && <NavLink to={`/artists/add`}>Add</NavLink>}
      <ArtistsList artists={artists} />
    </div>
  );
};
