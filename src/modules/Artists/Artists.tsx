import {
  useCallback,
  useContext,
  useEffect,
  useState,
  Suspense,
  lazy,
} from "react";
import { getAll } from "./core/api/artists";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../core/context/AuthContext";
import { ArtistsSkeleton } from "./components/ArtistsSkeleton";
import { IArtist } from "types";

export const Artists = () => {
  const ArtistsList = lazy(() => import("./components/ArtistsList"));

  const [artists, setArtists] = useState<IArtist[]>([]);

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
      {user?.isAdmin && <NavLink to={`add`}>Add</NavLink>}
      <Suspense fallback={<ArtistsSkeleton />}>
        {artists ? <ArtistsList artists={artists} /> : <ArtistsSkeleton />}
      </Suspense>
    </div>
  );
};
