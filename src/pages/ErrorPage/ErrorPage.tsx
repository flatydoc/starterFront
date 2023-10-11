import { IErrorPageProps } from "types";

export const ErrorPage = ({ error }: IErrorPageProps) => {
  return (
    <div>
      {error ? (
        <div>
          <p>{error.code}</p>
          <p>{error.message}</p>
        </div>
      ) : (
        <p>error</p>
      )}
    </div>
  );
};
