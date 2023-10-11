import ArtistsList from "./components/ArtistsList";
import { useCallback, useEffect, useState } from "react";
import { getArtistsByUserId } from "./core/api/artists";
import { IArtist } from "types";

export const UserArtists = () => {
  const [artists, setArtists] = useState<IArtist[]>();

  const getAllArtists = useCallback(async () => {
    await getArtistsByUserId()
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

  return (
    <div>
      <ArtistsList artists={artists} />
    </div>
  );
};
