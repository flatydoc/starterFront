import { Skeleton } from "primereact/skeleton";

export const ArtistsSkeleton = () => {
  return (
    <>
      <div style={{ display: "flex", gap: "20px" }} className="flex">
        <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
        <div style={{ flex: "1" }}>
          <Skeleton width="20%" className="mb-2"></Skeleton>
          <Skeleton width="10%"></Skeleton>
        </div>
      </div>
    </>
  );
};
