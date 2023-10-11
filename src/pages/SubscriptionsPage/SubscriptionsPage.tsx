import { UserArtists } from "../../modules/Artists/UserArtists";
import { UserEvents } from "../../modules/Events/UserEvents";

export const SubscriptionsPage = () => {
  return (
    <>
      <UserEvents />
      <UserArtists />
    </>
  );
};
