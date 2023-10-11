import { useNavigate } from "react-router-dom";

import { Artist } from "./Artist/Artist";

const ArtistsList = ({ artists }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/artists/${id}`, { state: { id } });
  };

  let artistElements = artists?.map((a, i) => (
    <Artist
      id={a.id}
      name={a.name}
      key={i}
      surname={a.surname}
      nickname={a.nickname}
      city={a.city}
      handleClick={handleClick}
    />
  ));

  return <div>{artistElements}</div>;
};

export default ArtistsList;
