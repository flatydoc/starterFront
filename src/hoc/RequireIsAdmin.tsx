import { AuthContext } from "../core/context/AuthContext";
import { useContext } from "react";
import { PropsWithChildren } from "react";
import { ErrorPage } from "pages/ErrorPage/ErrorPage";
import { IError } from "types";

export const RequireIsAdmin = ({ children }: PropsWithChildren) => {
  const { user } = useContext(AuthContext);

  if (user?.isAdmin) {
    return <>{children}</>;
  }

  const error: IError = {
    code: 403,
    message: "Доступ запрещен",
  };

  return <ErrorPage error={error} />;
};
