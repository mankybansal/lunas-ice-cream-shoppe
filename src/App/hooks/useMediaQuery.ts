import { useEffect, useState } from "react";

export const useMediaQuery = (mediaQuery: MediaQueryList["media"]) => {
  const isClientSide = typeof window !== "undefined";
  const [isVerified, setIsVerified] = useState(
    isClientSide && window.matchMedia(mediaQuery).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const documentChangeHandler = () => setIsVerified(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", documentChangeHandler);

    documentChangeHandler();
    return () => {
      mediaQueryList.removeEventListener("change", documentChangeHandler);
    };
  }, [mediaQuery]);

  return isVerified;
};
