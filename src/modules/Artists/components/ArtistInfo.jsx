export const ArtistInfo = ({ artist, subscribeToArtist }) => {
  return (
    <>
      <button onClick={subscribeToArtist}>subscribeToArtist</button>
      <p>{artist && artist.nickname}</p>
    </>
  );
};
