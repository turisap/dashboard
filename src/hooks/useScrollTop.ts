import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const useScrollTop = () => {
  const { pathname } = useLocation();
  const prev = useRef("");

  useEffect(() => {
    if (prev.current !== pathname) {
      window.scrollTo(0, 0);
    }

    prev.current = pathname;
  }, [pathname]);

  return null;
};

export { useScrollTop };
