import { useEffect, useRef } from "react";

interface IUseDocumentTitleProps {
  title: string;
  prevailOnUnmount?: boolean;
}

export const useDocumentTitle = ({
  title,
  prevailOnUnmount = false,
}: IUseDocumentTitleProps) => {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    []
  );
};
